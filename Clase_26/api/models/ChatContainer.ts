import fs from 'fs'
import FileSystemContainer from './fsContainer'
import normalizeAndDenormalize from "../utils/normalizr"
import util from "util";

function print(objeto: any) {
  console.log(util.inspect(objeto, false, 12, true));
}


class ChatContainer extends FileSystemContainer {
  constructor(){
      super('./DB/chat.json')
  }

  public async readChatFromFile() {
      try {
          const messages: any = await fs.promises.readFile(this.filePath, 'utf8')
          const messageList = JSON.parse(messages)
          
          const messageListDenormalized = normalizeAndDenormalize('denormalize', messageList)
          console.log("Denormalized")
          print(messageListDenormalized)
          return messageListDenormalized
  
      } catch (err) {
          console.log("File cannot be read " + err)
      }
  }

  public async writeChatToFile(messagesArray: any) {
      
      try {
          const messageListNormalized = normalizeAndDenormalize('normalize', messagesArray)
          console.log("Normalized")
          print(messageListNormalized)
          await fs.promises.writeFile(this.filePath, JSON.stringify(messageListNormalized))

      } catch (err) {
          console.log("File cannot be written " + err)
      }
  }

}

export default new ChatContainer