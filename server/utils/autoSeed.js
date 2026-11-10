import Property from '../models/Property.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';
import Admin from '../models/Admin.js';
import Enquiry from '../models/Enquiry.js';
import { sampleProperties, sampleProjects, sampleTestimonials, sampleEnquiries } from './seedData.js';

export const seedDatabaseIfEmpty = async () => {
  try {
    // 1. Seed Properties
    const propCount = await Property.countDocuments();
    if (propCount === 0) {
      const cleanProps = sampleProperties.map(({ _id, ...rest }) => rest);
      await Property.insertMany(cleanProps);
      console.log(`🌱 Auto-seeded ${cleanProps.length} verified sample properties into MongoDB.`);
    }

    // 2. Seed Projects
    const projCount = await Project.countDocuments();
    if (projCount === 0) {
      const cleanProjects = sampleProjects.map(({ _id, ...rest }) => rest);
      await Project.insertMany(cleanProjects);
      console.log(`🌱 Auto-seeded ${cleanProjects.length} verified sample projects into MongoDB.`);
    }

    // 3. Seed Testimonials
    const testCount = await Testimonial.countDocuments();
    if (testCount === 0) {
      const cleanTestimonials = sampleTestimonials.map(({ _id, ...rest }) => rest);
      await Testimonial.insertMany(cleanTestimonials);
      console.log(`🌱 Auto-seeded ${cleanTestimonials.length} client testimonials into MongoDB.`);
    }

    // 4. Seed Inquiries
    const enqCount = await Enquiry.countDocuments();
    if (enqCount === 0) {
      const cleanEnquiries = sampleEnquiries.map(({ _id, ...rest }) => rest);
      await Enquiry.insertMany(cleanEnquiries);
      console.log(`🌱 Auto-seeded ${cleanEnquiries.length} sample inquiries into MongoDB.`);
    }

    // 5. Seed Admin User
    const defaultEmail = (process.env.DEFAULT_ADMIN_EMAIL || 'admin@anubhutigroup.com').toLowerCase();
    const defaultPass = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@Anubhuti2026#';
    const adminExists = await Admin.findOne({ email: defaultEmail });
    if (!adminExists) {
      await Admin.create({
        username: 'anubhuti_admin',
        email: defaultEmail,
        password: defaultPass,
        role: 'Super Admin',
      });
      console.log(`👑 Auto-seeded default admin user: ${defaultEmail}`);
    } else {
      // Ensure password hash is valid
      const isMatch = await adminExists.matchPassword(defaultPass);
      if (!isMatch) {
        adminExists.password = defaultPass;
        await adminExists.save();
        console.log(`👑 Re-synchronized admin password hash for: ${defaultEmail}`);
      }
    }
  } catch (err) {
    console.warn('⚠️ Auto-seed notice:', err.message);
  }
};
