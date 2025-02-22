export class LangflowClient {
    private baseURL: string;
    private applicationToken: string;
  
    constructor(baseURL: string, applicationToken: string = process.env.NEXT_PUBLIC_LANGFLOW_APPLICATION_TOKEN || '') {
      this.baseURL = baseURL;
      this.applicationToken = applicationToken;
    }
  
    private async post(endpoint: string, body: any, headers: Record<string, string> = {}) {
      headers["Authorization"] = `Bearer ${this.applicationToken}`;
      headers["Content-Type"] = "application/json";
      const url = `${this.baseURL}${endpoint}`;
  
      try {
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(body)
        });
  
        const responseMessage = await response.json();
        if (!response.ok) {
          throw new Error(`${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`);
        }
        return responseMessage;
      } catch (error) {
        console.error('Request Error:', error);
        throw error;
      }
    }
  
    async initiateSession(flowId: string, langflowId: string, inputValue: any, inputType = 'chat', outputType = 'chat', stream = false, tweaks = {}) {
      const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}?stream=${stream}`;
      return this.post(endpoint, { 
        input_value: inputValue, 
        input_type: inputType, 
        output_type: outputType, 
        tweaks: tweaks 
      });
    }
  
    handleStream(streamUrl: string, onUpdate: (data: any) => void, onClose: (message: string) => void, onError: (error: any) => void) {
      const eventSource = new EventSource(streamUrl);
  
      eventSource.onmessage = event => {
        const data = JSON.parse(event.data);
        onUpdate(data);
      };
  
      eventSource.onerror = event => {
        console.error('Stream Error:', event);
        onError(event);
        eventSource.close();
      };
  
      eventSource.addEventListener("close", () => {
        onClose('Stream closed');
        eventSource.close();
      });
  
      return eventSource;
    }
  
    async runFlow(
      flowId: string,
      langflowId: string,
      inputValue: any,
      inputType = 'chat',
      outputType = 'chat',
      tweaks = {},
      stream = false,
      onUpdate?: (data: any) => void,
      onClose?: (message: string) => void,
      onError?: (error: any) => void
    ) {
      try {
        const initResponse = await this.initiateSession(
          flowId,
          langflowId,
          inputValue,
          inputType,
          outputType,
          stream,
          tweaks
        );
  
        if (stream && 
            initResponse?.outputs?.[0]?.outputs?.[0]?.artifacts?.stream_url && 
            onUpdate && onClose && onError) {
          const streamUrl = initResponse.outputs[0].outputs[0].artifacts.stream_url;
          console.log(`Streaming from: ${streamUrl}`);
          this.handleStream(streamUrl, onUpdate, onClose, onError);
        }
  
        return initResponse;
      } catch (error) {
        console.error('Error running flow:', error);
        if (onError) onError('Error initiating session');
        throw error;
      }
    }
  }