'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, X, Send, Bot, User, ShoppingCart, Star } from 'lucide-react';
import { productService } from '@/services/admin';
import Image from 'next/image';
import { Product } from '@/types/admin';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isStreaming?: boolean;
  productIds?: string[]; // Thêm field để lưu product IDs
}

// Interface cho response từ API Llama
interface LlamaResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  productIdsHeader?: string[];
}

// Component hiển thị sản phẩm
const ProductCard = ({ product }: { product: Product }) => (
  <div className="border rounded-lg p-3 bg-white shadow-sm hover:shadow-md transition-shadow">
    <div className="flex gap-3">
      <Image 
        src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${product?.path}`}
        alt={product.name}
        width={64}
        height={64}
        className="w-16 h-16 object-cover rounded"
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
        }}
      />
      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-800 line-clamp-2 mb-1">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lime-600 font-semibold text-sm">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
          {/* {product.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-gray-600">{product.rating}</span>
            </div>
          )} */}
        </div>
        <Button size="sm" className="w-full bg-lime-600 hover:bg-lime-700 text-xs">
          <ShoppingCart className="w-3 h-3 mr-1" />
          Xem chi tiết
        </Button>
      </div>
    </div>
  </div>
);

// Component hiển thị danh sách sản phẩm
const ProductList = ({ productIds }: { productIds: string[] }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Gọi API để lấy thông tin sản phẩm dựa trên IDs
        const response = await productService.findProductsByListId(productIds);
        setProducts(response || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productIds.length > 0) {
      fetchProducts();
    }
  }, [productIds]);

  if (loading) {
    return (
      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <ShoppingCart className="w-4 h-4 text-lime-600" />
          <span className="text-sm font-medium text-gray-700">Sản phẩm gợi ý</span>
        </div>
        <div className="space-y-2">
          {[1, 2].map((i) => (
            <div key={i} className="border rounded-lg p-3 bg-white">
              <div className="flex gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse mb-2 w-20"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <ShoppingCart className="w-4 h-4 text-lime-600" />
        <span className="text-sm font-medium text-gray-700">Sản phẩm gợi ý</span>
      </div>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

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

  const parseStreamChunk = (chunk: string): { text: string; productIds: string[] } => {
    try {
      const jsonObjects = chunk.split(/\n/).filter(line => line.trim() !== '');
      let extractedText = '';
      let productIds: string[] = [];

      for (const jsonStr of jsonObjects) {
        const data = JSON.parse(jsonStr) as LlamaResponse;
        if (data.response) extractedText += data.response;
        if (data.productIdsHeader) productIds = data.productIdsHeader;
      }

      return { text: extractedText, productIds };
    } catch (error) {
      console.error('Parse error:', error);
      return { text: chunk, productIds: [] };
    }
  };

  const callChatAPI = async (prompt: string) => {
    const apiUrl = 'http://localhost:8000/chat';
    
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
          isStreaming: true,
        }
      ]);

      // Gọi API với stream=true
      const response = await fetch(apiUrl, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: prompt,
        }),
      });

      console.log('Response headers:', response.headers); // Debug log
      
      // Lấy thông tin từ headers
      const responseSessionId = response.headers.get('X-Session-ID');
      const productIdsHeader = response.headers.get('x-product-ids');
      console.log('Response Session ID:', productIdsHeader); // Debug log      
      // Parse product IDs từ header
      let productIds: string[] = [];
      if (productIdsHeader) {
        try {
          // Thử parse JSON nếu header là array JSON
          productIds = JSON.parse(productIdsHeader);
        } catch {
          // Nếu không phải JSON, thử split bằng dấu phẩy
          productIds = productIdsHeader.split(',').map(id => id.trim()).filter(id => id !== '');
        }
      }
      
      console.log('Parsed Product IDs:', productIds); // Debug log

      response.headers.forEach((v, k) => {
        console.log(`Header [${k}]: ${v}`);
      });

      // Xử lý response dạng stream
      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      let botResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          botResponse += chunk;

          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId
              ? { ...msg, text: botResponse, isStreaming: true }
              : msg
          ));
        }

        // Cập nhật message cuối cùng với product IDs
        setMessages(prev => prev.map(msg =>
          msg.id === botMessageId
            ? { 
                ...msg, 
                isStreaming: false,
                productIds: productIds.length > 0 ? productIds : undefined
              }
            : msg
        ));
        
        console.log('Final message with product IDs:', { botResponse, productIds }); // Debug log
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
              <span className="font-semibold">AI Hỗ trợ khách hàng</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-lime-700 rounded-full p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">
                <Bot className="w-12 h-12 mx-auto mb-2 text-lime-600" />
                <p>Xin chào! Tôi có thể giúp gì cho bạn?</p>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id}>
                  <div
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
                  
                  {/* Hiển thị component sản phẩm nếu có productIds */}
                  {message.sender === 'bot' && message.productIds && message.productIds.length > 0 && (
                    <div className="flex justify-start mt-2">
                      <div className="max-w-[80%]">
                        <ProductList productIds={message.productIds} />
                      </div>
                    </div>
                  )}
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