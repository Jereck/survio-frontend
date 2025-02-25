import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, BarChart2, Users, Zap, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">

      <main className="flex-grow">
        <section className="py-20 sm:py-32">
          <div className="container max-w-screen-xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 flex-1">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl xl:text-6xl">
                  User Research Made <span className="text-primary">Simple</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[600px]">
                  Create, distribute, and analyze surveys with ease. Empower your indie development with data-driven
                  decisions.
                </p>
                <Button size="lg" className="mt-4">
                  Get Started for Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 w-full max-w-[600px]">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-[32px] blur-3xl opacity-25 animate-pulse"></div>
                  <div className="relative bg-white/50 backdrop-blur-sm rounded-[32px] border shadow-2xl shadow-primary/10 transition duration-300 hover:scale-[1.02] hover:shadow-primary/20">
                    <Image
                      src="/placeholder.png"
                      alt="Survur.io Dashboard"
                      width={1200}
                      height={800}
                      className="w-full h-auto rounded-[32px]"
                      priority
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 sm:py-32 bg-muted/50">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">Why Choose Survur.io?</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Zap, title: "Lightning Fast", description: "Create and launch surveys in minutes, not hours." },
                {
                  icon: Users,
                  title: "User-Centric",
                  description: "Designed specifically for indie developers and their needs.",
                },
                {
                  icon: CheckCircle,
                  title: "Actionable Insights",
                  description: "Get clear, data-driven insights to improve your products.",
                },
              ].map((feature, index) => (
                <Card key={index}>
                  <CardHeader className="text-center">
                    <div className="mx-auto">
                      <feature.icon className="h-12 w-12 text-primary mb-4" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 sm:py-32">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-bold tracking-tight text-center mb-12">How It Works</h2>
            <div className="grid gap-12 md:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Create Your Survey",
                  description: "Design your survey with our intuitive builder.",
                },
                { step: "2", title: "Distribute", description: "Share your survey with your target audience easily." },
                { step: "3", title: "Analyze Results", description: "Get powerful insights from your survey data." },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-muted">
          <div className="container max-w-screen-xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Ready to Supercharge Your User Research?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-[600px] mx-auto">
              Join thousands of indie developers making data-driven decisions with Survur.io
            </p>
            <Button size="lg">
              Start Your Free Trial
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <BarChart2 className="h-6 w-6" />
              <span className="font-bold">Survur.io</span>
            </div>
            <p className="text-sm text-muted-foreground mt-4 sm:mt-0">© 2024 Survur.io. All rights reserved.</p>
            <nav className="flex gap-4 mt-4 sm:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  )
}

