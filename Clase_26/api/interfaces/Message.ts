import { NewMessage } from './NewMessage'

export interface Message extends NewMessage {
  id: number
  time: string
  dateString: string
}