import { DeepPartial, Repository } from "typeorm";
import { FamilyMember } from "../entities/family-member.entity";

export const FamilyMemberRepository = (repo: Repository<FamilyMember>) => repo.extend({
    
    async findAll() {
        return await this.find();
    },

    async createByUser(userId: string, createFamilyMemberDto: any) {
        if (!userId) throw new Error('userId is required');
        const familyMember = this.create({...createFamilyMemberDto, userId});
        familyMember.createdBy = userId;
        return await this.save(familyMember);
    },

    async findAllByUser(userId: string) {
        return await this.find({ where: { userId } });
    },

    async findOneByUser(userId: string, id: string) {
        return await this.findOne({ where: { id, userId } });
    },

    async updateByUser(userId: string, id: string, updateFamilyMemberDto: any) {
        return await this.update({ id, userId }, updateFamilyMemberDto);
    },

    async deleteByUser(userId: string, id: string) {
        return await this.delete({ id, userId });
    }
});
