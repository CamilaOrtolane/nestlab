'use client'

// react
import { useCallback, useState } from 'react'
//
import { yupResolver } from '@hookform/resolvers/yup'
// mui
import LoadingButton from '@mui/lab/LoadingButton'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
// react
import { useForm } from 'react-hook-form'
// auth
import { useAuthContext } from 'src/auth/hooks'
// components
import FormProvider, { RHFTextField } from 'src/components/hook-form'
import Iconify from 'src/components/iconify'
import SvgColor from 'src/components/svg-color'
// config
import { PATH_AFTER_LOGIN } from 'src/config-global'
// hooks
import { useBoolean } from 'src/hooks/use-boolean'
// routes
import { RouterLink } from 'src/routes/components'
import { useSearchParams } from 'src/routes/hook'
import { paths } from 'src/routes/paths'
//
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function JwtRegisterView() {
  const { register } = useAuthContext()

  const [errorMsg, setErrorMsg] = useState('')

  const searchParams = useSearchParams()

  const returnTo = searchParams.get('returnTo')

  const password = useBoolean()

  const RegisterSchema = Yup.object().shape({
    completName: Yup.string().required('Nome completo é obrigatório'),
    email: Yup.string().required('Email é obrigatório').email('Email inválido'),
    password: Yup.string().required('Senha é obrigatório'),
    confirmPassword: Yup.string()
      .required('Confimar senha é obrigatório')
      .oneOf([Yup.ref('password'), null], 'As senhas devem ser iguais'),
  })

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  }

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(
    async (data) => {
      try {
        await register?.(
          data.email,
          data.password,
          data.firstName,
          data.lastName
        )
        window.location.href = returnTo || PATH_AFTER_LOGIN
      } catch (error) {
        console.error(error)
        reset()
        setErrorMsg(typeof error === 'string' ? error : error.message)
      }
    },
    [register, reset, returnTo]
  )

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Crie uma conta para continuar</Typography>
    </Stack>
  )

  const renderTerms = (
    <Typography
      component="div"
      sx={{
        color: 'text.secondary',
        mt: 2.5,
        typography: 'caption',
        textAlign: 'center',
      }}
    >
      {'By signing up, I agree to '}
      <Link underline="always" color="text.primary">
        Terms of Service
      </Link>
      {' and '}
      <Link underline="always" color="text.primary">
        Privacy Policy
      </Link>
      .
    </Typography>
  )

  const renderForm = (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <RHFTextField
          name="completName"
          label="Nome completo"
          placeholder="Qual seu nome no RG?"
        />

        <RHFTextField
          name="email"
          label="E-mail"
          placeholder="Seu melhor e-mail"
        />

        <RHFTextField
          name="password"
          label="Senha"
          placeholder="Sua senha secreta"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="confirmPassword"
          label="Confirmar senha"
          placeholder="Confirme sua senha secreta"
          type={password.value ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={password.onToggle} edge="end">
                  <Iconify
                    icon={
                      password.value
                        ? 'solar:eye-bold'
                        : 'solar:eye-closed-bold'
                    }
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          sx={{ backgroundColor: '#318bba' }}
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          startIcon={<SvgColor src={`/assets/icons/auth/ic_login.svg`} />}
        >
          Criar conta
        </LoadingButton>

        <Stack
          direction="row"
          spacing={0.5}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2"> Já possui uma conta? </Typography>

          <Link
            href={paths.auth.jwt.login}
            component={RouterLink}
            variant="subtitle2"
          >
            Faça login
          </Link>
        </Stack>
      </Stack>
    </FormProvider>
  )

  return (
    <>
      {renderHead}

      {renderForm}

      {/*renderTerms*/}
    </>
  )
}
