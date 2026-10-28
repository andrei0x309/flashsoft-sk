import { getCapInstanceAndState, updateCapState } from '#/lib/index/cap.ts';
import { getCapChallengeConfig } from '#/lib/index/cap.ts';
import type { RequestHandler } from './$types';

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

  return Response.json(newState);
};
