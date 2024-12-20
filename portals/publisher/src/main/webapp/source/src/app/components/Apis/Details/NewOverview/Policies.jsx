/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { withAPI } from 'AppComponents/Apis/Details/components/ApiContext';
import CONSTS from 'AppData/Constants';

/**
 *
 *
 * @param {*} props
 * @returns
 */
function Policies(props) {
    const { parentClasses, api } = props;
    const isSubValidationDisabled = api.policies 
    && api.policies.length === 1 && api.policies[0].includes(CONSTS.DEFAULT_SUBSCRIPTIONLESS_PLAN);
    return (
        <>
            <Grid item xs={12} md={6} lg={6}>
                <Typography component='p' variant='subtitle2' className={parentClasses.subtitle}>
                    <FormattedMessage
                        id='Apis.Details.NewOverview.Policies.business.plans'
                        defaultMessage='Business Plans'
                    />
                </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
                {/* Throttling Policies */}
                <Typography component='p' variant='body1'>
                    {api.policies && api.policies.length > 0 ? (
                        (() => {
                            // Filter out "Default_Subscriptionless" if there's more than one policy
                            const filteredPolicies = api.policies.filter((policy) => 
                                !policy.includes(CONSTS.DEFAULT_SUBSCRIPTIONLESS_PLAN));
                            
                            // Check if the only policy is "Default_Subscriptionless"
                            if (isSubValidationDisabled) {
                                return <span>-</span>;
                            }

                            // Render filtered policies
                            return filteredPolicies.length > 0 ? (
                                filteredPolicies.map((item, index) => (
                                    <span>
                                        {item}
                                        {filteredPolicies.length !== index + 1 && ', '}
                                        {' '}
                                    </span>
                                ))
                            ) : (
                                <span>-</span> // Default case if no policies to show
                            );
                        })()
                    ) : (
                        <span>-</span> // Case when there are no policies at all
                    )}
                </Typography>
            </Grid>
        </>
    );
}

Policies.propTypes = {
    parentClasses: PropTypes.shape({}).isRequired,
    api: PropTypes.shape({}).isRequired,
};

export default withAPI(Policies);
