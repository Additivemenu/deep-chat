import {DeepChatTextRequestBody} from '../../../types/deepChatTextRequestBody';
import errorHandler from '../../../utils/errorHandler';
import {NextRequest, NextResponse} from 'next/server';

export const config = {
  runtime: 'edge',
};

async function handler(req: NextRequest) {
  // ! 1. parse NextQuest
  // Text messages are stored inside request body using the Deep Chat JSON format:
  // https://deepchat.dev/docs/connect
  const messageRequestBody = (await req.json()) as DeepChatTextRequestBody;

  // ! 2. issue api calling to your custom server
  console.log(messageRequestBody);

  // ! 3. return NextResponse to Deep Chat
  // Sends response back to Deep Chat using the Response format:
  // https://deepchat.dev/docs/connect/#Response
  return NextResponse.json({text: 'This is a respone from a NextJS edge server. Thankyou for your message!'});
}

export default errorHandler(handler);
