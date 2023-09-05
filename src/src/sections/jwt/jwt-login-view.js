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
import { useTheme } from '@mui/material/styles'
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
import { RouterLink } from 'src/routes/components'
// routes
import { useSearchParams } from 'src/routes/hook'
import { paths } from 'src/routes/paths'
//
import * as Yup from 'yup'

// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login } = useAuthContext()
  const theme = useTheme()

  const PRIMARY_MAIN = theme.palette.primary.main

  const [errorMsg, setErrorMsg] = useState('')

  const searchParams = useSearchParams()

  const returnTo = searchParams.get('returnTo')

  const password = useBoolean()

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email é obrigatório').email('Email inválido'),
    password: Yup.string().required('Senha é obrigatório'),
  })

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
  })

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = useCallback(
    async (data) => {
      try {
        await login?.(data.email, data.password)

        window.location.href = returnTo || PATH_AFTER_LOGIN
      } catch (error) {
        console.error(error)
        reset()
        setErrorMsg(typeof error === 'string' ? error : error.message)
      }
    },
    [login, reset, returnTo]
  )

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Faça login para continuar</Typography>
    </Stack>
  )

  const renderForm = (
    <Stack spacing={2.5}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <RHFTextField
        name="email"
        label="E-mail"
        placeholder={'Seu melhor e-mail'}
      />

      <RHFTextField
        name="password"
        label="Senha"
        type={password.value ? 'text' : 'password'}
        placeholder={'Sua senha secreta'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify
                  icon={
                    password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'
                  }
                />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link
        component={RouterLink}
        href={paths.auth.jwt.register}
        variant="subtitle2"
        sx={{ color: PRIMARY_MAIN }}
      >
        Esqueceu sua senha?
      </Link>

      <LoadingButton
        fullWidth
        sx={{ backgroundColor: '#318bba' }}
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        startIcon={<SvgColor src={`/assets/icons/auth/ic_login.svg`} />}
      >
        Entrar
      </LoadingButton>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">Ainda não é cadastrado?</Typography>

        <Link
          component={RouterLink}
          href={paths.auth.jwt.register}
          variant="subtitle2"
          sx={{ color: PRIMARY_MAIN }}
        >
          Crie uma conta
        </Link>
      </Stack>
    </Stack>
  )

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      {renderHead}

      {/* 
      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>
      */}

      {renderForm}
    </FormProvider>
  )
}
