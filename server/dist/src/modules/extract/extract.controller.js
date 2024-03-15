"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractController = void 0;
const common_1 = require("@nestjs/common");
const extract_service_1 = require("./extract.service");
let ExtractController = class ExtractController {
    constructor(extractService) {
        this.extractService = extractService;
    }
    async extractData(url) {
        return this.extractService.extractData(url);
    }
};
exports.ExtractController = ExtractController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("url")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ExtractController.prototype, "extractData", null);
exports.ExtractController = ExtractController = __decorate([
    (0, common_1.Controller)("extract"),
    __metadata("design:paramtypes", [extract_service_1.ExtractService])
], ExtractController);
//# sourceMappingURL=extract.controller.js.map