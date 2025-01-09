import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ReactMarkdown from 'react-markdown';

interface ChatProps {
  platform: string;
  postType: string;
  region: string;
  genre: string;
}

const Chat: React.FC<ChatProps> = ({ platform, postType, region, genre }) => {
  const [chatResponse, setChatResponse] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchChatResponse = async () => {
    if (!platform || !postType || !region || !genre) {
      setError('Missing required fields');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ platform, postType, region, genre }),
      });

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

  // Call fetchChatResponse when the component mounts or when props change
  React.useEffect(() => {
    fetchChatResponse();
  }, [platform, postType, region, genre]);

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

<<<<<<< HEAD
export default Chat;
=======
export default Chat;
>>>>>>> 95e295f34e8b68a128a249ba4503ffeae6e46b65
