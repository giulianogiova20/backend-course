import { normalize, denormalize, schema } from 'normalizr'

const normalizeAndDenormalize = (action: string, messagesArray: any) => {

const author = new schema.Entity(
        "author",
        {},
        { idAttribute: "email" }
      );
      
      const message = new schema.Entity(
        "message",
        { author: author },
        { idAttribute: "id" }
      );
      
      const schemaMessages = new schema.Entity(
        "messages",
        {
          messages: [message],
        },
        { idAttribute: "id" }
      );

    

    if(action == "normalize") {
        return normalize({ id: "messages", messages: messagesArray}, schemaMessages)
    }else{
        return denormalize(messagesArray.result, schemaMessages, messagesArray.entities)
    }  
}

export default normalizeAndDenormalize