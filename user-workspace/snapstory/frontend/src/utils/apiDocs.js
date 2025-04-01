/**
 * API Documentation utilities
 */

const apiEndpoints = {};

/**
 * Register an API endpoint
 * @param {Object} endpoint - Endpoint definition
 * @param {string} endpoint.name - Endpoint name
 * @param {string} endpoint.path - API path
 * @param {string} endpoint.method - HTTP method
 * @param {Object} endpoint.params - Parameters
 * @param {Object} endpoint.response - Response schema
 * @param {string} endpoint.description - Description
 */
export const registerEndpoint = (endpoint) => {
  apiEndpoints[endpoint.name] = endpoint;
};

/**
 * Generate API documentation
 * @returns {Object} API documentation
 */
export const generateAPIDocs = () => {
  return {
    timestamp: new Date().toISOString(),
    endpoints: Object.values(apiEndpoints).map(endpoint => ({
      name: endpoint.name,
      path: endpoint.path,
      method: endpoint.method,
      description: endpoint.description,
      params: endpoint.params,
      response: endpoint.response
    }))
  };
};

/**
 * Get endpoint documentation
 * @param {string} name - Endpoint name
 * @returns {Object} Endpoint documentation
 */
export const getEndpointDoc = (name) => {
  return apiEndpoints[name];
};

/**
 * Generate TypeScript interfaces from API docs
 * @returns {string} TypeScript interfaces
 */
export const generateTSInterfaces = () => {
  let output = '// Auto-generated API interfaces\n\n';
  
  Object.values(apiEndpoints).forEach(endpoint => {
    if (endpoint.params) {
      output += `interface ${endpoint.name}Params {\n`;
      Object.entries(endpoint.params).forEach(([name, type]) => {
        output += `  ${name}: ${type};\n`;
      });
      output += '}\n\n';
    }

    if (endpoint.response) {
      output += `interface ${endpoint.name}Response {\n`;
      Object.entries(endpoint.response).forEach(([name, type]) => {
        output += `  ${name}: ${type};\n`;
      });
      output += '}\n\n';
    }
  });

  return output;
};

/**
 * Generate Markdown documentation
 * @returns {string} Markdown documentation
 */
export const generateMarkdownDocs = () => {
  let output = '# API Documentation\n\n';
  output += `> Generated on ${new Date().toISOString()}\n\n`;

  Object.values(apiEndpoints).forEach(endpoint => {
    output += `## ${endpoint.name}\n`;
    output += `**${endpoint.method}** \`${endpoint.path}\`\n\n`;
    output += `${endpoint.description}\n\n`;

    if (endpoint.params) {
      output += '### Parameters\n';
      output += '| Name | Type | Description |\n';
      output += '|------|------|-------------|\n';
      Object.entries(endpoint.params).forEach(([name, {type, description}]) => {
        output += `| ${name} | ${type} | ${description || ''} |\n`;
      });
      output += '\n';
    }

    if (endpoint.response) {
      output += '### Response\n';
      output += '```typescript\n';
      output += `interface Response {\n`;
      Object.entries(endpoint.response).forEach(([name, type]) => {
        output += `  ${name}: ${type};\n`;
      });
      output += '}\n```\n\n';
    }
  });

  return output;
};

/**
 * Generate OpenAPI/Swagger specification
 * @returns {Object} OpenAPI specification
 */
export const generateOpenAPISpec = () => {
  return {
    openapi: '3.0.0',
    info: {
      title: 'SnapStory API',
      version: '1.0.0'
    },
    paths: Object.values(apiEndpoints).reduce((paths, endpoint) => {
      const path = {
        [endpoint.method.toLowerCase()]: {
          summary: endpoint.name,
          description: endpoint.description,
          parameters: endpoint.params ? Object.entries(endpoint.params).map(([name, {type, description}]) => ({
            name,
            in: 'query',
            schema: { type },
            description
          })) : [],
          responses: {
            '200': {
              description: 'Successful response',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: endpoint.response ? Object.entries(endpoint.response).reduce((props, [name, type]) => {
                      props[name] = { type };
                      return props;
                    }, {}) : {}
                  }
                }
              }
            }
          }
        }
      };
      paths[endpoint.path] = path;
      return paths;
    }, {})
  };
};