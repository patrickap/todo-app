import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Button, Input, Link, Text, Title } from '../components';
import { isRequired } from '../core/validation';
import { useNavigate } from '@tanstack/react-location';

type SignInFormFields = {
  username: string;
  password: string;
};

const SignIn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const signInForm = useForm<SignInFormFields>({
    defaultValues: { username: 'admin', password: 'admin' },
  });

  return (
    <div className='flex h-5/6 items-center justify-center'>
      <div className='w-full max-w-md'>
        <div>
          <div>
            <Title>{t('page.sign_in.title')}</Title>
          </div>
          <div className='mt-2'>
            <Text>{t('page.sign_in.text')}</Text>
          </div>
        </div>

        <div>
          <div className='mt-6'>
            <Controller
              control={signInForm.control}
              name='username'
              rules={{
                validate: {
                  isRequired,
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  ref={field.ref}
                  label={t('form.label.username')}
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
          <div className='mt-2'>
            <Controller
              control={signInForm.control}
              name='password'
              rules={{
                validate: {
                  isRequired,
                },
              }}
              render={({ field, fieldState }) => (
                <Input
                  ref={field.ref}
                  type='password'
                  label={t('form.label.password')}
                  value={field.value}
                  error={fieldState.error?.message}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </div>
        </div>

        <div>
          <div className='mt-8 flex flex-col items-center justify-center'>
            <div className='w-full'>
              <Button color='blue' isFullWidth={true}>
                {t('action.sign_in')}
              </Button>
            </div>
            <div className='mt-2 text-sm'>
              {t('page.sign_in.sign_up_question')}{' '}
              <Link onClick={() => navigate({ to: '/sign-up', replace: true })}>
                {t('action.sign_up')}.
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SignIn };
