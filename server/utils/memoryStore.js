import bcrypt from 'bcryptjs';
import { sampleProperties, sampleProjects, sampleTestimonials, sampleEnquiries } from './seedData.js';

// In-Memory Data Store with clone so changes are isolated
class MemoryStore {
  constructor() {
    this.properties = JSON.parse(JSON.stringify(sampleProperties));
    this.projects = JSON.parse(JSON.stringify(sampleProjects));
    this.testimonials = JSON.parse(JSON.stringify(sampleTestimonials));
    this.enquiries = JSON.parse(JSON.stringify(sampleEnquiries));
    this.admins = [];
    this.initialized = false;
  }

  async init() {
    if (this.initialized) return;
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@anubhutigroup.com';
    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@Anubhuti2026#';
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPass, salt);

    this.admins.push({
      _id: 'admin-001',
      username: 'anubhuti_admin',
      email: defaultEmail.toLowerCase(),
      password: hashedPassword,
      role: 'Super Admin',
      createdAt: new Date(),
    });
    this.initialized = true;
  }
}

export const memoryStore = new MemoryStore();
await memoryStore.init();

