import React, { useState } from 'react';
import { Folder, File, ArrowRight, Loader2 } from 'lucide-react';

interface FileSize {
  name: string;
  size: number;
  type: 'file' | 'folder';
  children?: FileSize[];
}

function formatSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(2)} ${units[unitIndex]}`;
}

function FileItem({ item, depth = 0 }: { item: FileSize; depth?: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const percentage = Math.min((item.size / 1000000) * 100, 100); // Max 100%

  return (
    <div className="mb-2">
      <div 
        className="flex items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
        onClick={() => item.type === 'folder' && setIsOpen(!isOpen)}
        style={{ marginLeft: `${depth * 20}px` }}
      >
        <div className="w-6">
          {item.type === 'folder' ? (
            <Folder className="text-blue-500" size={20} />
          ) : (
            <File className="text-gray-500" size={20} />
          )}
        </div>
        <div className="flex-1 ml-2">
          <div className="flex items-center justify-between">
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-gray-600">{formatSize(item.size)}</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-1">
            <div 
              className="h-full bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
      {item.type === 'folder' && isOpen && item.children?.map((child, index) => (
        <FileItem key={index} item={child} depth={depth + 1} />
      ))}
    </div>
  );
}

function App() {
  const [path, setPath] = useState('');
  const [data, setData] = useState<FileSize | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const calculateSize = async () => {
    if (!path) {
      setError('请输入文件夹路径');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:3000/api/calculate-size', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '计算文件夹大小时出错');
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : '计算文件夹大小时出错');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Folder className="text-blue-500 mr-2" size={24} />
          <h1 className="text-2xl font-bold text-gray-800">文件夹大小计算器</h1>
        </div>
        
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="输入文件夹路径，例如: /home/user/documents"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={calculateSize}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  计算中...
                </>
              ) : (
                '计算大小'
              )}
            </button>
          </div>
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
        </div>

        <div className="bg-blue-50 p-4 rounded-lg mb-6">
          <div className="flex items-center text-blue-700">
            <ArrowRight className="mr-2" size={20} />
            <p>点击文件夹可以展开或收起内容</p>
          </div>
        </div>

        <div className="space-y-2">
          {data && <FileItem item={data} />}
        </div>
      </div>
    </div>
  );
}

export default App;