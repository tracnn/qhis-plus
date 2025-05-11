export abstract class BaseEntity {
    private id: number;
    private version: number;
    private createdAt: Date;
    private updatedAt: Date;
    private deletedAt: Date | null;
    private createdBy: string | null;
    private updatedBy: string | null;
  
    constructor(params: {
        id?: number;
        version?: number;
        createdAt?: Date;
        updatedAt?: Date;
        deletedAt?: Date | null;
        createdBy?: string | null;
        updatedBy?: string | null;
    }) {
        this.id = params.id ?? 0;
        this.version = params.version ?? 0;
        this.createdAt = params.createdAt ?? new Date();
        this.updatedAt = params.updatedAt ?? new Date();
        this.deletedAt = params.deletedAt ?? null;
        this.createdBy = params.createdBy ?? null;
        this.updatedBy = params.updatedBy ?? null;
    }
  
    // Getter methods
    public getId(): number {
      return this.id;
    }
  
    public getVersion(): number {
      return this.version;
    }
  
    public getCreatedAt(): Date {
      return this.createdAt;
    }
  
    public getUpdatedAt(): Date {
      return this.updatedAt;
    }
  
    public getDeletedAt(): Date | null {
      return this.deletedAt;
    }
  
    public getCreatedBy(): string | null {
      return this.createdBy;
    }
  
    public getUpdatedBy(): string | null {
      return this.updatedBy;
    }
  
    // Business Methods
    public markUpdated(updatedBy: string | null): void {
      this.updatedAt = new Date();
      this.updatedBy = updatedBy;
      this.incrementVersion();
    }
  
    public markDeleted(deletedBy: string | null): void {
      this.deletedAt = new Date();
      this.updatedBy = deletedBy;
    }
  
    public restore(): void {
      this.deletedAt = null;
    }
  
    public incrementVersion(): void {
      this.version += 1;
    }
}
  