import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

const services = [
  { title: 'Web Development', description: 'Custom website design and development tailored to your needs.' },
  { title: 'Mobile App Development', description: 'Create powerful and intuitive mobile applications for iOS and Android.' },
  { title: 'UI/UX Design', description: 'Design beautiful and user-friendly interfaces for web and mobile applications.' },
  { title: 'Cloud Solutions', description: 'Implement and manage cloud-based infrastructure and services.' },
  { title: 'Data Analytics', description: 'Harness the power of your data with advanced analytics and visualization.' },
  { title: 'Cybersecurity', description: 'Protect your digital assets with our comprehensive security solutions.' },
];

export default function Services() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 text-green-500" />
                {service.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{service.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}