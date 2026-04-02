import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import doctorRoutes from './routes/doctors';
import appointmentRoutes from './routes/appointments';
import availabilityRoutes from './routes/availability';
import patientRoutes from './routes/patients';
import prescriptionRoutes from './routes/prescriptions';
import recordRoutes from './routes/records';
import messageRoutes from './routes/messages';
import cmsRoutes from './routes/cms';
import adminRoutes from './routes/admin';
import { errorHandler } from './middleware/errorHandler';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  dotenv.config();
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(helmet());
  app.use(cors({ origin: process.env.CORS_ORIGIN }));
  app.use(express.json());
  app.use(morgan('dev'));

  // API routes FIRST
  app.use('/api/auth', authRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/appointments', appointmentRoutes);
  app.use('/api/availability', availabilityRoutes);
  app.use('/api/patients', patientRoutes);
  app.use('/api/prescriptions', prescriptionRoutes);
  app.use('/api/records', recordRoutes);
  app.use('/api/messages', messageRoutes);
  app.use('/api', cmsRoutes);
  app.use('/api', adminRoutes);

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
      root: path.join(process.cwd(), 'client'),
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Error Handling
  app.use(errorHandler);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
