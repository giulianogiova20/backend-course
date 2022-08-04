import { Message, NewMessage } from '../interfaces'
import fs from 'fs'
import { normalizeAndDenormalize }from "../utils/normalizr"

class ChatContainer {
  private static filePath: string
  private readonly chatFilePath: string

  constructor(filePath: string) {
    ChatContainer.filePath = filePath
    this.chatFilePath = './api/data/chat.txt'
  }


  public addMessage = async ({ message }: NewMessage): Promise<void> => {
    try {
      const messagesNormalized = normalizeAndDenormalize("normalize", message);

      await fs.promises.writeFile(
        "../../DB/chat.txt",JSON.stringify(messagesNormalized)
      );
    } catch (err) {
      console.log("no se pudo escribir el archivo " + err);
    }
  }

  public async getAllMessages(): Promise<Message[]> {
    const messages: Message[] = await this.db.select('*').from(this.table)

    return messages
  }
}

export default new Chat(messages)