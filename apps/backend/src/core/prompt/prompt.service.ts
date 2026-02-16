import { Injectable } from '@nestjs/common';
import { PromptType } from '@smartcv/types';
import { PromptGenerator } from './prompt.interface';

@Injectable()
export class PromptService {
  private readonly generators = new Map<PromptType, PromptGenerator>();

  register(type: PromptType, generator: PromptGenerator): void {
    this.generators.set(type, generator);
  }

  getGenerator(type: PromptType): PromptGenerator {
    const generator = this.generators.get(type);
    if (!generator) {
      throw new Error(`No PromptGenerator registered for type: ${type}`);
    }
    return generator;
  }
}
