
export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high"
};

export interface logEntityOptions {
  level:LogSeverityLevel,
  message:string,
  createdAt?:Date,
  origin:string
}

export class LogEntity {

  public level: LogSeverityLevel; // Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options:logEntityOptions) {
    const {level, message, origin, createdAt = new Date()} = options;
    this.level = level;
    this.message = message;
    this.createdAt = createdAt
    this.origin = origin;
  }

  static fromJson = (json:string):LogEntity => {

    (json === '') ? json = '{}' : json
    
    const {message, level, createdAt, origin} = JSON.parse(json);
    
    // if(!message || !level || !createdAt) throw new Error('Invalid log entity');

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin
    });

    return log

  }

  static fromObject = (logObject: {[key:string]: any}):LogEntity => {

    const { message, level, createdAt, origin } = logObject;
    
    if(!message || !level || !origin) throw new Error('Invalid log entity');

    const log = new LogEntity({
      message: message,
      level: level,
      createdAt: createdAt,
      origin: origin
    });

    return log;

  }
};