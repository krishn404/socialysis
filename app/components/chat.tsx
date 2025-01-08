import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

const Chat = () => {
  const [chatResponse, setChatResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchChatResponse = async () => {
    try {
      const response = await fetch('/api/proxy');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.message) {
        setChatResponse(data.message);
      } else if (data.error) {
        throw new Error(data.error);
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error("Error fetching chat response:", error);
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChatResponse();
  }, []);

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Chat Response</CardTitle>
        <CardDescription>Response from the chat API</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {loading ? (
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin h-6 w-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 p-4 rounded-md bg-red-50">
            <p>{error}</p>
          </div>
        ) : chatResponse ? (
          <div className="prose max-w-none">
            <ReactMarkdown>{chatResponse}</ReactMarkdown>
          </div>
        ) : (
          <p className="text-gray-500">No message available</p>
        )}
      </CardContent>
    </Card>
  );
};

export default Chat;