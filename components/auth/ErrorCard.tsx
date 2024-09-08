import CardWrapper from "@/components/auth/CardWrapper"

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Error"
      headerText="Oops! Something went wrong!"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
      children={null}
    />
  )
}

export default ErrorCard
