import { OpenAI } from 'openai';
import { BusinessInfo } from '../../types';
import { getOpenAIClient } from './config';

export async function getContextualHelp(section: string, businessInfo: BusinessInfo): Promise<string> {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return 'AI assistance is currently unavailable. Please configure your OpenAI API key.';
    }

    const prompt = `Provide helpful guidance for completing the ${section} section of a workers compensation application for:
      Business Type: ${businessInfo.entityType}
      Description: ${businessInfo.description}
      
      Focus on:
      1. Required information
      2. Common mistakes to avoid
      3. Industry-specific considerations
      4. Best practices`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('AI Help Error:', error);
    return '';
  }
}

export async function getSmartSuggestions(section: string, businessInfo: BusinessInfo): Promise<string[]> {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return ['AI assistance is currently unavailable. Please configure your OpenAI API key.'];
    }

    const prompt = `Provide 3-5 smart tips for optimizing the ${section} section of a workers compensation application for:
      Business Type: ${businessInfo.entityType}
      Description: ${businessInfo.description}
      
      Focus on:
      1. Data accuracy
      2. Risk reduction
      3. Premium optimization
      4. Compliance requirements`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7
    });

    return completion.choices[0].message.content?.split('\n')
      .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
      .map(line => line.replace(/^[-•]\s*/, '')) || [];
  } catch (error) {
    console.error('Smart Tips Error:', error);
    return [];
  }
}

export async function getFieldSuggestions(
  field: string,
  currentValue: string,
  businessInfo: BusinessInfo
): Promise<string> {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return 'AI assistance is currently unavailable. Please configure your OpenAI API key.';
    }

    const prompt = `As an insurance expert, provide a brief suggestion to improve this ${field} entry:
      Current Value: ${currentValue}
      Business Type: ${businessInfo.entityType}
      Industry Context: ${businessInfo.description}`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7,
      max_tokens: 100
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('AI Suggestion Error:', error);
    return '';
  }
}

export async function getIndustrySpecificGuidance(
  businessInfo: BusinessInfo
): Promise<string[]> {
  try {
    const openai = getOpenAIClient();
    if (!openai) {
      return ['AI assistance is currently unavailable. Please configure your OpenAI API key.'];
    }

    const prompt = `Provide industry-specific workers compensation guidance for:
      Business Type: ${businessInfo.entityType}
      Description: ${businessInfo.description}
      Employee Count: ${businessInfo.payrollInfo.reduce((sum, info) => sum + info.employeeCount, 0)}
      
      Focus on:
      1. Common risks
      2. Required safety programs
      3. Insurance considerations
      4. Best practices`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      temperature: 0.7
    });

    return completion.choices[0].message.content?.split('\n')
      .filter(line => line.trim().length > 0)
      .map(line => line.trim()) || [];
  } catch (error) {
    console.error('AI Guidance Error:', error);
    return [];
  }
}