import { Injectable } from '@nestjs/common';

@Injectable()
export class GovernmentService {
  async verifyCAC(cacNumber: string) {
    // Mock response
    return {
      status: 'success',
      data: {
        cacNumber,
        companyName: 'Qatalyst TechLabs Ltd',
        registrationDate: '2015-03-01',
        status: 'Active',
      },
    };
  }

  async verifyNIN(nin: string) {
    return {
      status: 'success',
      data: {
        nin,
        fullName: 'John Doe',
        dob: '1990-05-12',
        gender: 'Male',
        status: 'Verified',
      },
    };
  }

  async verifyTIN(tin: string) {
    return {
      status: 'success',
      data: {
        tin,
        taxpayerName: 'Jane Smith',
        registeredOn: '2017-10-20',
        compliance: true,
      },
    };
  }

  async verifyBVN(bvn: string) {
    return {
      status: 'success',
      data: {
        bvn,
        fullName: 'David Johnson',
        bank: 'Access Bank',
        accountLinked: true,
      },
    };
  }

  async verifyPhone(phone: string) {
    return {
      status: 'success',
      data: {
        phone,
        carrier: 'MTN Nigeria',
        isActive: true,
        registeredName: 'Emeka Obi',
      },
    };
  }
}
