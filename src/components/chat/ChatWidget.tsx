'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
}

// Interface cho response từ API Llama
interface LlamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const parseStreamChunk = (chunk: string): string => {
    try {
      // Tách các JSON objects trong chunk (có thể có nhiều JSON trong một chunk)
      const jsonObjects = chunk.split(/\n/).filter(line => line.trim() !== '');
      
      let extractedText = '';
      
      // Xử lý từng JSON object
      for (const jsonStr of jsonObjects) {
        try {
          const data = JSON.parse(jsonStr) as LlamaResponse;
          
          // Trích xuất phần response từ mỗi JSON object
          if (data && data.response) {
            extractedText += data.response;
          }
        } catch (_error) {
          console.warn('Error parsing JSON:', _error, jsonStr);
          console.warn('Error parsing JSON in stream chunk:', jsonStr);
        }
      }
      
      return extractedText;
    } catch (_error) {
      console.error('Error parsing stream chunk:', _error);
      console.error('Error processing stream chunk:', chunk);
      return chunk; // Trả về nguyên chunk nếu xử lý lỗi
    }
  };

  const callChatAPI = async (prompt: string) => {
    const apiUrl = 'http://localhost:11434/api/generate';
    
    try {
      setIsLoading(true);
      
      // Tạo ID cho tin nhắn bot
      const botMessageId = Date.now() + 1;
      
      // Thêm tin nhắn bot rỗng với trạng thái streaming
      setMessages(prev => [
        ...prev, 
        { 
          id: botMessageId, 
          text: '', 
          sender: 'bot', 
          timestamp: new Date(),
          isStreaming: true 
        }
      ]);

      const promptToBot = 
      `
      Bạn là một trợ lý bán hàng thông minh cho một trang web bán nông sản hữu cơ, chuyên cung cấp các sản phẩm nông sản hữu cơ hoặc tươi sạch như rau, củ, quả, trái cây, và các sản phẩm chế biến từ nông sản. Nhiệm vụ của bạn là trả lời các câu hỏi của khách hàng một cách chính xác, thân thiện và ngắn gọn, đồng thời cung cấp thông tin hữu ích liên quan đến sản phẩm, giá cả, cách đặt hàng, vận chuyển, hoặc các chính sách của cửa hàng.
        Hướng dẫn:
        1. Trả lời bằng tiếng Việt, sử dụng ngôn ngữ dễ hiểu, phù hợp với khách hàng mua nông sản.
        2. Nếu câu hỏi liên quan đến sản phẩm, cung cấp thông tin ngắn gọn về giá, nguồn gốc, chất lượng, hoặc cách sử dụng (nếu phù hợp).
        3. Nếu câu hỏi không rõ ràng, hãy đặt câu hỏi ngược lại để làm rõ yêu cầu của khách hàng.
        4. Nếu phù hợp, gợi ý thêm sản phẩm hoặc dịch vụ liên quan (ví dụ: combo rau củ, cách bảo quản nông sản).
        5. Nếu câu hỏi nằm ngoài phạm vi thông tin bạn có, trả lời rằng bạn sẽ chuyển câu hỏi đến bộ phận hỗ trợ và cung cấp cách liên hệ (ví dụ: email, hotline).
        6. Tránh sử dụng thuật ngữ kỹ thuật phức tạp, ưu tiên từ ngữ gần gũi với người tiêu dùng.

        Câu hỏi của khách hàng: "${prompt}"

        Hãy trả lời theo hướng dẫn trên.
      `;

      // Gọi API với stream=true
      const response = await fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "llama3.2",
          prompt: promptToBot,
          stream: true
        }),
      });

      // Xử lý response dạng stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let botResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          // Decode phần dữ liệu mới nhận được
          const chunk = decoder.decode(value, { stream: true });
          
          // Phân tích và trích xuất text từ chunk JSON
          const extractedText = parseStreamChunk(chunk);
          botResponse += extractedText;
          
          // Cập nhật tin nhắn đang streaming
          setMessages(prev => prev.map(msg => 
            msg.id === botMessageId 
              ? { ...msg, text: botResponse, isStreaming: true } 
              : msg
          ));
        }
        
        // Hoàn thành streaming
        setMessages(prev => prev.map(msg => 
          msg.id === botMessageId 
            ? { ...msg, isStreaming: false } 
            : msg
        ));
      }
    } catch (error) {
      console.error('Error calling chat API:', error);
      // Thêm tin nhắn lỗi từ bot
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          text: 'Xin lỗi, có lỗi xảy ra khi xử lý yêu cầu của bạn.', 
          sender: 'bot', 
          timestamp: new Date() 
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Thêm tin nhắn của người dùng
    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userPrompt = inputMessage;
    setInputMessage('');

    // Gọi API với tin nhắn của người dùng
    await callChatAPI(userPrompt);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-lime-600 text-white p-4 rounded-full shadow-lg hover:bg-lime-700 transition-colors z-50"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 rounded-lg shadow-xl z-50">
          <div className="bg-gray-400/50 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5" />
              <span className="font-semibold te">AI Hỗ trợ khách hàng</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-lime-700 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white ">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <Bot className="w-12 h-12 mx-auto mb-2 text-lime-600" />
                <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-lime-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs">
                        {message.timestamp.toLocaleTimeString()}
                      </span>
                      {message.isStreaming && (
                        <span className="ml-1 text-xs">đang trả lời...</span>
                      )}
                    </div>
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nhập câu hỏi..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-lime-600 hover:bg-lime-700"
                disabled={isLoading}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 