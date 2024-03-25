import React from 'react';
import GenericCompanyLogo from '../icons/generic_company_logo';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { primary } = publicRuntimeConfig.colorScheme;
const { projectName } = publicRuntimeConfig;

const LogoComponent = () => {
    console.log(`Loading Logo with primary color: ${primary}`);
    return (
        <div className="flex items-center">
            <div className={`h-[65px] w-[65px] md-nav:h-[100px] md-nav:w-[100px] overflow-hidden`}>
                <GenericCompanyLogo color={primary} className="object-contain object-center" />
            </div>
            <span className={`text-2xl font-bold pr-4 text-primary`}>{projectName}</span>
        </div>
    );
};

export default LogoComponent;
