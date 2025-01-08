import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Chat = () => {
  const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Chat Insights</CardTitle>
        <CardDescription>Discussions based on the analysis parameters.</CardDescription>
      </CardHeader>
      <CardContent className={`p-4 ${isDarkTheme ? 'bg-black/50 text-white' : 'bg-gray-100 text-black'} rounded-lg`}>
        <p className="text-lg">
          This section provides insights and discussions based on the analysis parameters.
        </p>
      </CardContent>
    </Card>
  );
};

export default Chat;
