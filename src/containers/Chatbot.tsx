import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LimeBoiPNG from "@/assets/lime-boi.png"
import { Button } from "@/components/ui/button"
import { Forward, Loader } from "lucide-react"
import { useState } from "react"
import axios from "axios"
import { Separator } from "../components/ui/separator"

const ChatbotCard = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<string>("")
  const [value, setValue] = useState<string>("")

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)

  const handleSubmit = async () => {
    setLoading(true)
    const response = await axios.post(`${import.meta.env.VITE_API_HOST}chatbot`, {
      question: value,
    })
    setResponse(response.data)
    setLoading(false)
  }

  return (
    <div className="flex gap-4 flex-col">
      <Card className="max-w-sm">
        <CardHeader>
          <img src={LimeBoiPNG} alt="LimeBoi" className="w-60 mx-auto" />
          <CardTitle className="text-center">Hi! My name is Louie the Lime Boi!</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            className="flex gap-2 mb-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <Input type="text" value={value} onChange={onChange} placeholder="Ask me anything..." />
            <Button type="submit" onClick={handleSubmit}>
              <Forward />
            </Button>
          </form>
          {loading && <Loader className="animate-spin mx-auto" />}
          {!loading && response && (
            <>
              <Separator className="my-8" />
              <p className="whitespace-pre-wrap">
                <strong>Lime Boi: </strong>
                {response}
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ChatbotCard
