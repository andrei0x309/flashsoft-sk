import type { RequestHandler } from '../$types';
import { json } from '@sveltejs/kit';
import { getCapInstanceAndState, updateCapState } from '@/lib/index/cap';
import { getCapChallengeConfig } from '@/lib/index/cap';

export const POST: RequestHandler = async () => {
  const { cap, state } = await getCapInstanceAndState();

  const newState = cap.createChallenge(getCapChallengeConfig());
  await updateCapState({
    challengesList: {
      ...state.challengesList,
      [newState.token as string]: {
        challenge: newState.challenge,
        token: newState.token,
        expires: newState.expires
      }
    }
  });

  return json(newState);
};
