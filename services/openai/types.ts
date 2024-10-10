export interface ChatMessageType {
  role: string;
  content: string;
}

export interface ChatType {
  model: string;
  temperature: number;
  messages: ChatMessageType[];
}

export interface AudioType {
  model: string;
  file: File;
}
