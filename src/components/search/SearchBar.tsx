'use client';

import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/utils/axiosInstance";
import debounce from "lodash/debounce";
import { activityLogService } from "@/services/activityLogService";

interface SearchResult {
  id: string;
  name: string;
  slug: string;
  path: string;
}

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Tạo hàm debounce cho việc tìm kiếm
  const debouncedSearch = useCallback(
    debounce(async (term: string) => {
      if (!term.trim()) {
        setResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axiosInstance.get(`/api/v1/product/search=${term}`);
        const data = response.data.data;
        setResults(data);
        setShowResults(true);

        // Lưu log tìm kiếm
        await activityLogService.logSearch(term);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Cleanup debounce khi component unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    debouncedSearch(searchTerm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleProductClick = async (productId: string) => {
    // Lưu log khi người dùng click vào sản phẩm
    await activityLogService.logView(productId);
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Tìm kiếm..."
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          className="pl-8 w-52 md:w-[700px] border focus:outline-none focus:ring-0 focus:border-none"
        />
        <Button 
          onClick={handleSearch}
          className="absolute right-0 top-0 bg-lime-600 hover:bg-lime-700"
        >
          Tìm kiếm
        </Button>
      </div>

      {/* Dropdown kết quả tìm kiếm */}
      {showResults && (results?.length > 0 || isLoading) && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border">
          {isLoading ? (
            <div className="p-4 text-center">Đang tìm kiếm...</div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {results.map((result) => (
                <Link
                  key={result.id}
                  href={`/san-pham/${result.slug}`}
                  onClick={() => handleProductClick(result.id)}
                  className="flex items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <div className="relative w-12 h-12 mr-3">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_MINIO_URL}${result?.path}`}
                      alt={result.name}
                      unoptimized
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <span className="text-gray-800">{result.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
} 