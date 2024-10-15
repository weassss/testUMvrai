'use client'

import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Twitter, Linkedin } from 'lucide-react'

export default function About() {
  const timelineEvents = [
    { year: 1976, event: 'Umallette Manufacturing founded' },
    { year: 1985, event: 'Expanded operations to include CNC machining' },
    { year: 1995, event: 'Opened first international office' },
    { year: 2005, event: 'Launched innovative product line' },
    { year: 2015, event: 'Achieved ISO 9001:2015 certification' },
    { year: 2023, event: 'Celebrating 47 years of excellence' },
  ]

  const leadershipTeam = [
    { name: 'John Doe', role: 'CEO', image: '/placeholder.svg?height=300&width=300&text=John' },
    { name: 'Jane Smith', role: 'COO', image: '/placeholder.svg?height=300&width=300&text=Jane' },
    { name: 'Mike Johnson', role: 'CTO', image: '/placeholder.svg?height=300&width=300&text=Mike' },
    { name: 'Sarah Brown', role: 'CFO', image: '/placeholder.svg?height=300&width=300&text=Sarah' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Who We Are Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center">About Umallette Manufacturing</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
              <p className="mb-4">
                Umallette Manufacturing is a leading innovator in the manufacturing industry, 
                providing cutting-edge solutions for businesses worldwide. With over four decades 
                of experience, we've established ourselves as a trusted partner for companies 
                seeking to optimize their manufacturing processes.
              </p>
              <p>
                Our commitment to quality, innovation, and customer satisfaction drives everything 
                we do. From state-of-the-art machinery to expert consultation services, we're 
                dedicated to helping our clients achieve unprecedented levels of efficiency and 
                productivity.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600&text=Umallette+Manufacturing"
                alt="Umallette Manufacturing Facility"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company History Timeline */}
      <section className="py-16 px-4 bg-secondary">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Journey</h2>
          <div className="relative">
            {timelineEvents.map((event, index) => (
              <div key={index} className={`flex items-center mb-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-1/2 px-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{event.year}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {event.event}
                    </CardContent>
                  </Card>
                </div>
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
                  {index + 1}
                </div>
                <div className="w-1/2"></div>
              </div>
            ))}
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-primary -ml-0.5"></div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-semibold mb-8 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    width={200}
                    height={200}
                    className="rounded-full mx-auto mb-4"
                  />
                  <h3 className="text-xl font-semibold">{leader.name}</h3>
                  <p className="text-muted-foreground">{leader.role}</p>
                  <div className="flex justify-center space-x-2 mt-4">
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA for Recruitment */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl mb-8">We're always looking for talented individuals to help us shape the future of manufacturing.</p>
          <Button size="lg" variant="secondary" asChild>
            <a href="/jobs">View Open Positions</a>
          </Button>
        </div>
      </section>
    </div>
  )
}