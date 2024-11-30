// import Queue from 'bull';
// import { injectable } from 'tsyringe';

// @injectable()
// export class QueueService {
//   private queues: Map<string, Queue.Queue>;

//   constructor() {
//     this.queues = new Map();
//   }

//   getQueue(name: string): Queue.Queue {
//     if (!this.queues.has(name)) {
//       this.queues.set(name, new Queue(name, {
//         redis: process.env.REDIS_URL
//       }));
//     }
//     return this.queues.get(name)!;
//   }
// }
