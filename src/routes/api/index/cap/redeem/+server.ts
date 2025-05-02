import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { getCapInstanceAndState, updateCapState } from '@/lib/index/cap';
import crypto from 'node:crypto';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { token, solutions } = body;

    if (!token || !solutions) {
      return json({ success: false }, { status: 400 });
    }

    const { cap, state } = await getCapInstanceAndState();

    const result = await cap.redeemChallenge({ token, solutions });

    const tokenSplit = result?.token?.split(':');

    if (!tokenSplit?.length) {
      return json({ success: false }, { status: 400 });
    }

    const tokenHash = crypto.createHash('sha256').update(tokenSplit[1]).digest('hex');

    const keyToken = `${tokenSplit[0]}:${tokenHash}`;

    if (result.success) {
      await updateCapState({
        challengesList: {
          ...state.challengesList
        },
        tokensList: {
          ...state.tokensList,
          [keyToken]: result.expires as number
        }
      });

      console.log('[cap] Challenge redeemed');
    }

    return json(result);
  } catch (e) {
    console.error(e);
    return json({ success: false }, { status: 400 });
  }
};
