"use client"

import { useSearchParams } from "next/navigation"
import CardWrapper from "./CardWrapper"
import { BeatLoader } from "react-spinners"
import { useCallback, useEffect, useState } from "react"
import { newVerification } from "@/actions/newVerification"
import FormSuccess from "../ui/formSuccess"
import FormError from "../ui/formError"


const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token")

  const onSubmit = useCallback( () => {
    if (!token) {
      setError("Missing Token")
      return
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success)
        setError(data.error)
      })
  }, [token])

  useEffect(() => {
    onSubmit();
  }, [onSubmit])

  return (
    <CardWrapper
      headerLabel="Verify email"
      headerText="Confirming your registration"
      backButtonLabel="Return to login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center justify-center">
        {!success && !error &&
          <BeatLoader loading/>
        }
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  )
}

export default NewVerificationForm
