/*
* Copyright (c) 2023, WSO2 LLC. (http://www.wso2.org) All Rights Reserved.
* 
* WSO2 LLC. licenses this file to you under the Apache License,
* Version 2.0 (the "License"); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
* 
* http://www.apache.org/licenses/LICENSE-2.0
* 
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import React from 'react';
import { Typography, makeStyles, Theme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LaunchIcon from '@material-ui/icons/Launch';
import { FormattedMessage } from 'react-intl';
import CONSTS from 'AppData/Constants';
import type { CreatePolicySpec } from './Types';

const useStyles = makeStyles((theme: Theme) => ({
    link: {
        color: theme.palette.primary.dark,
        marginLeft: theme.spacing(2),
        display: 'inline',
    },
}));

interface CreatePolicySharedProps {
    handleDialogClose: () => void;
    dialogOpen: boolean;
    stopPropagation: any;
    onSave: (policySpecification: CreatePolicySpec) => void;
    synapsePolicyDefinitionFile: any[];
    setSynapsePolicyDefinitionFile: any;
    ccPolicyDefinitionFile: any[];
    setCcPolicyDefinitionFile: any;
    saving: any;
    PolicyCreateForm: any;
}

const CreatePolicyShared: React.FC<CreatePolicySharedProps> = ({
    handleDialogClose,
    dialogOpen,
    stopPropagation,
    onSave,
    synapsePolicyDefinitionFile,
    setSynapsePolicyDefinitionFile,
    ccPolicyDefinitionFile,
    setCcPolicyDefinitionFile,
    saving,
    PolicyCreateForm
}) => {
    const classes = useStyles();

    return (
        <>
            <Dialog
                maxWidth='md'
                open={dialogOpen}
                aria-labelledby='form-dialog-title'
                onClose={handleDialogClose}
                onClick={stopPropagation}
                fullWidth
            >
                <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    flexDirection='row'
                    px={3}
                    pt={3}
                >
                    <Box display='flex'>
                        <Typography variant='h4' component='h2'>
                            <FormattedMessage
                                id='Apis.Details.Policies.CreatePolicy.create.new.policy'
                                defaultMessage='Create New Policy'
                            />
                        </Typography>
                    </Box>
                    <Box display='flex'>
                        <IconButton
                            color='inherit'
                            onClick={handleDialogClose}
                            aria-label='Close'
                        >
                            <Icon>close</Icon>
                        </IconButton>
                    </Box>
                </Box>
                <DialogContent>
                    <Box my={2}>
                        <DialogContentText>
                            <PolicyCreateForm
                                onSave={onSave}
                                synapsePolicyDefinitionFile={synapsePolicyDefinitionFile}
                                setSynapsePolicyDefinitionFile={setSynapsePolicyDefinitionFile}
                                ccPolicyDefinitionFile={ccPolicyDefinitionFile}
                                setCcPolicyDefinitionFile={setCcPolicyDefinitionFile}
                                onCancel={handleDialogClose}
                                saving={saving}
                            />
                        </DialogContentText>
                    </Box>
                </DialogContent>
                <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='right'
                    px={3}
                    pb={3}
                >
                    <Link to={CONSTS.PATH_TEMPLATES.COMMON_POLICIES}>
                        <Typography className={classes.link} variant='caption'>
                            Want to create a common policy that will be visible to all APIs instead?
                            <LaunchIcon
                                style={{ marginLeft: '2px' }}
                                fontSize='small'
                            />
                        </Typography>
                    </Link>
                </Box>
            </Dialog>
        </>
    );
}

export default CreatePolicyShared;
