import { supabase } from '@/lib/db-client/supaClientFS';
import { getDiffFromNow } from '@/lib/common/misc';
import { Cap } from '@/lib/vendor/cap-server';

export const loadCapState = async () => {
  try {
    const { data } = await supabase.from('fsk_store').select('*').eq('name', 'capState').single();
    if (!data || getDiffFromNow(data.updated_at, 'minutes') > 15) {
      return null;
    }
    return data.value_json as {
      challengesList: {
        [key: string]: {
          challenge: string;
          token: string;
          expires: string;
        };
      };
      tokensList: {
        [key: string]: {
          token: string;
          created_at: string;
        };
      };
    };
  } catch (e) {
    return null;
  }
};

export const updateCapState = async (state: {
  challengesList: {
    [key: string]: {
      challenge: [string, string];
      token: string;
      expires: string;
    };
  };
  tokensList?: {
    [key: string]: string;
  };
}) => {
  try {
    const newState = {
      challengesList: {},
      tokensList: {}
    } as typeof state;

    for (const key in state.challengesList) {
      if (Number(state.challengesList[key].expires) > Date.now()) {
        newState.challengesList[key as string] = {
          challenge: state.challengesList[key].challenge,
          token: state.challengesList[key].token,
          expires: state.challengesList[key].expires
        };
      }
    }
    for (const key in state.tokensList) {
      if (Number(state.tokensList[key]) > Date.now()) {
        if (newState?.tokensList?.[key]) newState.tokensList[key] = state.tokensList[key];
      }
    }

    await supabase.from('fsk_store').upsert({
      name: 'capState',
      value_json: state,
      updated_at: new Date().toISOString()
    });
  } catch (e) {
    console.log(e);
  }
};

export const getCapChallengeConfig = async () => {
  return {
    challengeCount: 30,
    challengeSize: 28,
    challengeDifficulty: 4,
    expiresMs: 900000,
    store: false
  };
};

export const getCapInstanceAndState = async () => {
  const defaultState = {
    challengesList: {},
    tokensList: {}
  };

  const state = (await loadCapState()) || defaultState;

  return {
    cap: new Cap({
      state,
      noFSState: true
    }),
    state
  };
};
