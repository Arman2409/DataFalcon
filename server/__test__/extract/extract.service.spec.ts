import { Test, TestingModule } from '@nestjs/testing';
import { CacheModule } from '@nestjs/cache-manager';

import { ExtractService } from '../../src/modules/extract/extract.service';
import { CustomLogger } from '../../src/tools/logger';

const testURL = "https://httpbin.org/html";


describe('ExtractService', () => {
  let service: ExtractService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExtractService, CustomLogger],
      imports: [
        CacheModule.register({
          ttl: 5 * 60 * 1000, // Time to live (5 minutes)
          max: 100, // Maximum number of items in the cache
        }),
      ],
    }).compile();

    service = module.get<ExtractService>(ExtractService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw error if URL not defined',async () => {
    const {message = ""} = await service.extractData("");

    expect(message).toBe("Invalid URL");
  })

  it('should extract dataif url is given',async () => {
    const {titles, domElements, speed, links} = await service.extractData(testURL);
    
    expect(typeof speed).toBe("number");
    expect(links).toBeInstanceOf(Array);
    expect(domElements).toBeInstanceOf(Array);
    expect(titles).toBeInstanceOf(Object);
  })
});
