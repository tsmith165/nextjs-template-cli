import React from 'react';
import GenericCompanyLogo from '../icons/generic_company_logo';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.cjs';

const fullConfig = resolveConfig(tailwindConfig);
const projectName = fullConfig.theme.project_name;

const LogoComponent = () => {
    return (
        <div className="flex items-center">
            <div className={`h-[65px] w-[65px] md-nav:h-[100px] md-nav:w-[100px] overflow-hidden`}>
                <GenericCompanyLogo className="object-contain object-center" />
            </div>
            <span className={`text-2xl font-bold pr-4 text-primary`}>
                {projectName !== undefined ? projectName.replace(/-/g, ' ') : ''}
            </span>
        </div>
    );
};

export default LogoComponent;
