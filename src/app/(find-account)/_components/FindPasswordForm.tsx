'use client';

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldValues, useForm } from 'react-hook-form';
import { findPasswordSchema } from '@/schemas/findSchema';
import { findPassword } from '@/utils/auth/client-action';
import DefaultButton from '@/components/DefaultButton';
import EmailInput from '@/components/EmailInput';
import { fetchCurrentUserInfoByEmail } from '@/utils/user/client-action';
import Swal from 'sweetalert2';

const FindPasswordForm = () => {
  const defaultValues = {
    email: '',
  };

  const form = useForm<z.infer<typeof findPasswordSchema>>({
    mode: 'onChange',
    resolver: zodResolver(findPasswordSchema),
    defaultValues,
  });

  const { getFieldState, formState } = form;

  const onSubmit = async (values: FieldValues) => {
    const { email } = values;

    try {
      // 사용자 정보 조회
      const user = await fetchCurrentUserInfoByEmail(email);

      // 소셜 로그인 계정 확인
      if (user?.provider === 'google' || user?.provider === 'kakao') {
        await Swal.fire({
          html: `<div class="text-gray-700">해당 계정은 ${user?.provider} <br />소셜 로그인으로 가입되었습니다. <br />${user?.provider} 계정으로 로그인해주세요.</div>`,
          customClass: {
            title: 'swal-custom-title',
            htmlContainer: 'swal-custom-text',
          },
          showConfirmButton: false,
          footer: `<a href="/signin" class='swal-custom-button'>로그인하기</a>`,
        });
      }

      // 비밀번호 재설정 메일 전송
      const result = await findPassword(email);

      // 메일 전송 실패
      if (result instanceof Error) {
        console.error('비밀번호 재설정 메일 전송 오류:', result);
        return;
      }

      // 메일 전송 성공
      await Swal.fire({
        html: `<div class="text-gray-700">해당 이메일로 비밀번호<br/>변경링크를 보내드렸어요!</div>`,
        customClass: {
          title: 'swal-custom-title',
          htmlContainer: 'swal-custom-text',
          confirmButton: 'swal-custom-button',
        },
        confirmButtonText: '확인',
      });
    } catch (error) {
      console.error('비밀번호 찾기 오류:', error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col'
      >
        <div className='w-full'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => {
              const fieldState = getFieldState('email');
              return (
                <FormItem>
                  <FormControl>
                    <EmailInput
                      field={field}
                      domainOptions={['gmail.com', 'naver.com', 'daum.net', 'nate.com', 'hotmail.com', '직접 입력']}
                      inputClassName={`
                      ${fieldState.invalid ? 'border-red-500' : 'border-gray-300'}
                      ${!fieldState.invalid && field.value ? 'border-primary-400' : ''}
                    `}
                    />
                  </FormControl>
                  <FormMessage className='form-message' />
                </FormItem>
              );
            }}
          />
        </div>

        <hr className='border-t-1 border-gray-200 my-[3.125rem] max-md:hidden' />
        <div className='flex justify-center mt-[3.125rem] max-md:mt-[3.75rem]'>
          <DefaultButton
            disabled={!formState.isValid || formState.isSubmitting}
            className='w-full max-w-[15rem] max-md:max-w-none'
          >
            메일 전송
          </DefaultButton>
        </div>
      </form>
    </Form>
  );
};

export default FindPasswordForm;
