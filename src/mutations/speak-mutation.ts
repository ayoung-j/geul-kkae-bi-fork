/* eslint-disable react-hooks/rules-of-hooks */
import browserClient from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const insertSpeakScore = async (score: { score: number; userId: string; weekNumber: number }) => {
  return await browserClient
    .from('rank')
    .insert({
      user_id: score.userId,
      speaking: score.score,
      created_at: new Date(),
      week: score.weekNumber,
    })
    .select();
};
export const useInsertMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertSpeakScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speak'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const updateSpeakScore = async (score: { score: number; userId: string; week: number }) => {
  return await browserClient
    .from('rank')
    .update({
      speaking: score.score,
    })
    .eq('user_id', score.userId)
    .eq('week', score.week);
};
export const useUpdateMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: updateSpeakScore,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speak'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const insertSpeakResult = async (result: {
  userId: string | undefined;
  answer: string;
  game: string;
  weekNumber: number;
  score: number;
}) => {
  return await browserClient
    .from('answer')
    .insert({
      user_id: result.userId,
      answer: result.answer,
      game: result.game,
      week: result.weekNumber,
      score: result.score,
    })
    .select();
};
export const useInsertResultMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: insertSpeakResult,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['speakResult'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const deleteSpeakAnswer = async (result: { answer: string[]; userId: string | undefined }) => {
  if (!result.userId) {
    throw new Error('User ID가 없습니다');
  }

  return await browserClient.from('answer').delete().in('answer', result.answer).eq('user_id', result.userId);
};

export const useDeleteSpeakAnswersMutation = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: deleteSpeakAnswer,
    onSuccess: async () => {
      client.invalidateQueries({ queryKey: ['answer'] });
    },
    onError: (error) => {
      console.error(error);
    },
  });
};
