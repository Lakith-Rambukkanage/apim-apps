/*
 * Copyright (c) 2018 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.wso2.carbon.apimgt.tracing;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.wso2.carbon.apimgt.impl.APIManagerConfiguration;
import org.wso2.carbon.apimgt.tracing.internal.ServiceReferenceHolder;

import java.util.Iterator;
import java.util.ServiceLoader;

public class TracingServiceImpl implements TracingService {

    private static final Log log = LogFactory.getLog(TracingServiceImpl.class);
    private static APIManagerConfiguration configuration = ServiceReferenceHolder.getInstance()
            .getAPIManagerConfiguration();
    private static TracingServiceImpl instance = new TracingServiceImpl();
    private OpenTracer tracer = null;

    public static TracingServiceImpl getInstance() {
        return instance;
    }

    private TracingServiceImpl() {
        try {
            String openTracerName = configuration.getFirstProperty(TracingConstants.OPEN_TRACER_NAME) != null ?
                    configuration.getFirstProperty(TracingConstants.OPEN_TRACER_NAME)
                    : TracingConstants.DEFAULT_OPEN_TRACER_NAME;
            Boolean enabled =
                    Boolean.valueOf(configuration.getFirstProperty(TracingConstants.OPEN_TRACER_ENABLED) != null ?
                    configuration.getFirstProperty(TracingConstants.OPEN_TRACER_ENABLED)
                    : TracingConstants.DEFAULT_OPEN_TRACER_ENABLED);

            if (enabled) {
                ServiceLoader<OpenTracer> openTracers = ServiceLoader.load(OpenTracer.class,
                        OpenTracer.class.getClassLoader());
                Iterator iterator = openTracers.iterator();
                while (iterator.hasNext()) {
                    OpenTracer openTracer = (OpenTracer) iterator.next();
                    if (openTracer.getName().equals(openTracerName)) {
                        this.tracer = openTracer;
                    }
                }
            }
        } catch (Exception e) {
            log.error("Error in reading configuration file", e);
        }
    }

    @Override
    public TracingTracer buildTracer(String serviceName) {
        return new TracingTracer(tracer.getTracer(serviceName));
    }
}
