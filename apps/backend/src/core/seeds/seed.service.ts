import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from '../../modules/profiles/profile.entity';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    // eslint-disable-next-line @angular-eslint/prefer-inject
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}

  async onApplicationBootstrap() {
    const count = await this.profileRepo.count();
    if (count === 0) {
      await this.seed();
    }
  }

  private async seed() {
    const defaultProfile = this.profileRepo.create({
      name: 'John Doe',
      data: {
        personalInfo: {
          name: 'John Doe',
          job: 'Software Engineer',
          email: 'john.doe@example.com',
          phone: '+1 234 567 890',
          location: 'San Francisco, CA',
          linkedin: 'linkedin.com/in/johndoe',
          github: 'github.com/johndoe',
          web: 'johndoe.com',
          photo: null,
          profileSummary:
            'Experienced Software Engineer with a passion for building scalable web applications. Expert in TypeScript and Cloud Architecture.',
        },
        education: [
          {
            title: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            dateIn: '2015-09-01',
            dateFin: '2019-06-30',
            bullets: 'First Class Honours. Specialized in Distributed Systems.',
          },
        ],
        experience: [
          {
            role: 'Senior Software Engineer',
            company: 'Tech Solutions Inc.',
            dateIn: '2019-07-01',
            dateFin: 'Present',
            bullets:
              'Led the development of a high-traffic e-commerce platform using NestJS and Angular.\nOptimized database queries decreasing latency by 40%.\nMentored junior developers and established best coding practices.',
          },
        ],
        projects: [
          {
            name: 'SmartCV',
            subtitle: 'AI-Powered Resume Builder',
            dateIn: '2023-01-01',
            dateFin: 'Present',
            bullets:
              'Built a multi-tenant platform for automated resume generation.\nIntegrated multiple AI providers (OpenAI, Anthropic) for content optimization.',
          },
        ],
        skills: [
          {
            skills: ['TypeScript', 'Node.js', 'Angular', 'NestJS', 'PostgreSQL', 'Docker'],
            languages: ['English (Native)', 'Spanish (Professional)'],
            certifications: [
              {
                name: 'AWS Certified Solutions Architect',
                date: '2022-05-15',
              },
            ],
            additional: ['Agile Methodologies', 'TDD', 'Cloud Native'],
          },
        ],
      },
    });

    await this.profileRepo.save(defaultProfile);
    console.log('✅ Database seeded with default profile: John Doe');
  }
}
