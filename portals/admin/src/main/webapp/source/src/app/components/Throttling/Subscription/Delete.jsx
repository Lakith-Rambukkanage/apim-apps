/*
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
import PropTypes from 'prop-types';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormDialogBase from 'AppComponents/AdminPages/Addons/FormDialogBase';
import { FormattedMessage, useIntl } from 'react-intl';
import API from 'AppData/api';
import Alert from 'AppComponents/Shared/Alert';

/**
 * Render delete dialog box.
 * @param {JSON} props component props.
 * @returns {JSX} Loading animation.
 */
function Delete(props) {
    const restApi = new API();
    const {
        dataRow, updateList,
    } = props;
    const intl = useIntl();

    const formSaveCallback = () => {
        const policyId = dataRow[9];
        const promiseAPICall = restApi
            .deleteSubscriptionPolicy(policyId)
            .then(() => {
                updateList();
                return (
                    intl.formatMessage({
                        id: 'Throttling.Subscription.Policy.policy.delete.success',
                        defaultMessage: 'Subscription Rate Limiting Policy successfully deleted.',
                    })
                );
            })
            .catch(() => {
                Alert.error(
                    intl.formatMessage({
                        id: 'Throttling.Subscription.Policy.policy.delete.error',
                        defaultMessage: 'Subscription Rate Limiting Policy could not be deleted.',
                    }),
                );
                return false;
            });

        return (promiseAPICall);
    };

    return (
        <FormDialogBase
            title={intl.formatMessage({
                id: 'Throttling.Subscription.Policy.policy.delete.title',
                defaultMessage: 'Delete Subscription Policy?',
            })}
            saveButtonText={intl.formatMessage({
                id: 'Throttling.Subscription.Policy.policy.delete.btn',
                defaultMessage: 'Delete',
            })}
            icon={<DeleteForeverIcon aria-label='delete-subscription-policies' />}
            formSaveCallback={formSaveCallback}
        >
            <DialogContentText>
                <FormattedMessage
                    id='Throttling.Subscription.Policy.policy.dialog.delete.error'
                    defaultMessage='Subscription Rate Limiting Policy will be deleted.'
                />
            </DialogContentText>
        </FormDialogBase>
    );
}
Delete.defaultProps = {
    dataRow: null,
};

Delete.propTypes = {
    updateList: PropTypes.number.isRequired,
    dataRow: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    }),
};
export default Delete;
