'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, CheckCircle, XCircle, ExternalLink, Copy, Zap, Server } from 'lucide-react';
import { backendApi } from '@/lib/api-client';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react';

interface AuthConfigInfo {
  auth_config_id: string;
  user_id: string;
  auth_scheme: string;
}

interface ToolkitInfo {
  toolkit: string;
  auth_config_id: string;
  user_id: string;
  auth_scheme: string;
}

interface ConnectionRequest {
  redirect_url?: string;
  connected_account_id?: string;
  connection_id?: string;
  status: string;
}

interface TestResult {
  auth_config_info?: AuthConfigInfo;
  toolkit_info?: ToolkitInfo;
  connection_request: ConnectionRequest;
  test_status: 'success' | 'failed';
  message: string;
  instructions?: string;
  error?: string;
  mcp_urls?: {
    mcp_url: string;
    user_ids_url: string[];
    connected_account_urls: string[];
    mcp_server_info: MCPServerInfo;
  };
}

interface MCPServerInfo {
  id: string;
  name: string;
  auth_config_ids: string[];
  allowed_tools: string[];
  mcp_url: string;
}



export default function ComposioTestPage() {
  const [authConfigId, setAuthConfigId] = useState('ac_dqYN9oElNVlg');
  const [toolkit, setToolkit] = useState('github');
  const [userId, setUserId] = useState('0000-1111-2222');
  const [authScheme, setAuthScheme] = useState('OAUTH2');
  const [isLoading, setIsLoading] = useState(false);
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [testMode, setTestMode] = useState<'auth_config' | 'toolkit'>('toolkit');



  const handleTestAuthentication = async () => {
    if (testMode === 'auth_config' && (!authConfigId.trim() || !userId.trim())) {
      toast.error('Please fill in both Auth Config ID and User ID');
      return;
    }
    if (testMode === 'toolkit' && (!toolkit.trim() || !userId.trim())) {
      toast.error('Please fill in both Toolkit and User ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      let response;
      if (testMode === 'toolkit') {
        const queryParams = new URLSearchParams({
          toolkit: toolkit.trim(),
          test_user_id: userId.trim(),
          auth_scheme: authScheme,
        });
        response = await backendApi.post(`/composio/test-toolkit-authentication?${queryParams}`);
      } else {
        response = await backendApi.post('/composio/test-authentication', {
          auth_config_id: authConfigId.trim(),
          user_id: userId.trim(),
          auth_scheme: authScheme,
        });
      }

      if (response.success && response.data) {
        setTestResult(response.data);
        if (response.data.test_status === 'success') {
          toast.success('Authentication flow test completed successfully!');
        } else {
          toast.error(`Test failed: ${response.data.error || response.data.message}`);
        }
      } else {
        const errorMessage = response.error?.message || 'Unknown error occurred';
        setError(errorMessage);
        toast.error(`Test failed: ${errorMessage}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
      setError(errorMessage);
      toast.error(`Test failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoTest = async () => {
    setIsLoading(true);
    setError(null);
    setTestResult(null);

    try {
      let response;
      if (testMode === 'toolkit') {
        const queryParams = new URLSearchParams({
          toolkit: toolkit.trim(),
          test_user_id: userId.trim(),
          auth_scheme: authScheme,
        });
        response = await backendApi.post(`/composio/demo/test-toolkit?${queryParams}`);
      } else {
        response = await backendApi.post('/composio/demo/test-auth', {
          auth_config_id: authConfigId.trim(),
          user_id: userId.trim(),
          auth_scheme: authScheme,
        });
      }

      if (response.success && response.data) {
        setTestResult(response.data);
        if (response.data.test_status === 'success') {
          toast.success('Demo authentication test completed successfully!');
        } else {
          toast.error(`Demo test failed: ${response.data.error || response.data.message}`);
        }
      } else {
        const errorMessage = response.error?.message || 'Unknown error occurred';
        setError(errorMessage);
        toast.error(`Demo test failed: ${errorMessage}`);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error occurred';
      setError(errorMessage);
      toast.error(`Demo test failed: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };



  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const commonToolkits = [
    'github', 'gmail', 'slack', 'notion', 'trello', 'asana', 'linear', 'jira',
    'discord', 'telegram', 'whatsapp', 'twitter', 'linkedin', 'facebook',
    'google-drive', 'dropbox', 'onedrive', 'salesforce', 'hubspot', 'stripe'
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Тест аутентификации Composio</h1>
        <p className="text-muted-foreground">
          Протестируйте потоки аутентификации Composio - автоматически получайте URL-адреса сервера MCP при успешных подключениях!
        </p>
      </div>

      <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Authentication Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Конфигурация теста аутентификации</CardTitle>
                  <CardDescription>
                    Выберите между ID конфигурации аутентификации (вручную) или именем инструментария (автоматическое создание конфигурации аутентификации).
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Tabs value={testMode} onValueChange={(value) => setTestMode(value as 'auth_config' | 'toolkit')}>
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="toolkit" className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Режим инструментария (Рекомендуется)
                      </TabsTrigger>
                      <TabsTrigger value="auth_config">Режим конфигурации аутентификации</TabsTrigger>
                    </TabsList>

                    <TabsContent value="toolkit" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="toolkit">Название инструментария/приложения</Label>
                        <div className="flex gap-2">
                          <Select value={toolkit} onValueChange={setToolkit} disabled={isLoading}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Выберите инструментарий" />
                            </SelectTrigger>
                            <SelectContent>
                              {commonToolkits.map((tool) => (
                                <SelectItem key={tool} value={tool}>
                                  {tool.charAt(0).toUpperCase() + tool.slice(1)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Input
                            value={toolkit}
                            onChange={(e) => setToolkit(e.target.value)}
                            placeholder="Или введите свой собственный инструментарий"
                            className="flex-1"
                            disabled={isLoading}
                          />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          🚀 <strong>Автоматически создает конфигурацию аутентификации!</strong> Просто выберите любое приложение из 500+ поддерживаемых инструментариев.
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="auth_config" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="auth-config-id">ID конфигурации аутентификации</Label>
                        <Input
                          id="auth-config-id"
                          value={authConfigId}
                          onChange={(e) => setAuthConfigId(e.target.value)}
                          placeholder="Введите ID конфигурации аутентификации"
                          disabled={isLoading}
                        />
                        <p className="text-sm text-muted-foreground">
                          Идентификатор предварительно созданной конфигурации аутентификации из вашей панели управления Composio.
                        </p>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="space-y-2">
                    <Label htmlFor="user-id">Идентификатор пользователя</Label>
                    <Input
                      id="user-id"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Введите идентификатор пользователя"
                      disabled={isLoading}
                    />
                    <p className="text-sm text-muted-foreground">
                      Уникальный идентификатор для пользователя (может быть любой строкой)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="auth-scheme">Схема аутентификации</Label>
                    <Select value={authScheme} onValueChange={setAuthScheme} disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите схему аутентификации" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="OAUTH2">OAuth 2.0</SelectItem>
                        <SelectItem value="API_KEY">Ключ API</SelectItem>
                        <SelectItem value="BASIC">Базовая аутентификация</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      Схема аутентификации для вашей интеграции
                    </p>
                  </div>

                  <Separator />

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={handleTestAuthentication}
                      disabled={isLoading || (testMode === 'auth_config' ? (!authConfigId.trim() || !userId.trim()) : (!toolkit.trim() || !userId.trim()))}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Проверить аутентификацию (аутентифицирован)
                    </Button>

                    <Button
                      variant="outline"
                      onClick={handleDemoTest}
                      disabled={isLoading || (testMode === 'auth_config' ? (!authConfigId.trim() || !userId.trim()) : (!toolkit.trim() || !userId.trim()))}
                      className="flex-1"
                    >
                      {isLoading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Демонстрационный тест (без аутентификации)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Auth Service Info */}
            <Card>
              <CardHeader>
                <CardTitle>Информация об аутентификации</CardTitle>
                <CardDescription>
                  Состояние службы и примеры значений.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={async () => {
                    try {
                      const response = await backendApi.get('/composio/health');
                      if (response.success) {
                        toast.success('Composio service is healthy!');
                      } else {
                        toast.error('Composio service is not available');
                      }
                    } catch (err) {
                      toast.error('Failed to check service health');
                    }
                  }}
                  className="w-full"
                >
                  Проверить состояние службы
                </Button>

                <Separator />

                <div className="space-y-3">
                  <Label className="text-sm font-semibold">💡 Преимущества режима инструментария:</Label>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Автоматически создает конфигурации аутентификации</li>
                    <li>• Мгновенно поддерживает более 500 приложений</li>
                    <li>• Не требуется ручное управление ID</li>
                    <li>• 🚀 Автоматически генерирует URL-адреса MCP!</li>
                    <li>• Идеально подходит для производства</li>
                  </ul>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="text-sm font-semibold">Примеры значений:</Label>
                  <div className="text-sm space-y-1">
                    <p><strong>Инструментарий:</strong> github, gmail, slack</p>
                    <p><strong>Идентификатор пользователя:</strong> 0000-1111-2222</p>
                    <p><strong>ID конфигурации аутентификации:</strong> ac_dqYN9oElNVlg</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Auth Error Display */}
          {error && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>Произошла ошибка аутентификации: {error}</AlertDescription>
            </Alert>
          )}

          {/* Auth Test Results */}
          {testResult && (
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold">Результаты аутентификации</h2>
                <Badge variant={testResult.test_status === 'success' ? 'default' : 'destructive'}>
                  {testResult.test_status === 'success' ? 'Успешно' : 'Неудача'}
                </Badge>
                {testResult.toolkit_info && (
                  <Badge variant="outline" className="bg-green-50">
                    <Zap className="h-3 w-3 mr-1" />
                    Режим инструментария
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Auth Config Info */}
                {testResult.auth_config_info && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Конфигурация аутентификации
                        <Badge variant="outline">{testResult.auth_config_info.auth_scheme}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">ID конфигурации аутентификации</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                            {testResult.auth_config_info.auth_config_id}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.auth_config_info!.auth_config_id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Идентификатор пользователя</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                            {testResult.auth_config_info.user_id}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.auth_config_info!.user_id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Схема аутентификации</Label>
                        <p className="text-sm mt-1">{testResult.auth_config_info.auth_scheme}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Toolkit Info */}
                {testResult.toolkit_info && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        Конфигурация инструментария
                        <Badge variant="outline">{testResult.toolkit_info.auth_scheme}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Инструментарий</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                            {testResult.toolkit_info.toolkit}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.toolkit_info!.toolkit)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Автоматически созданный ID конфигурации аутентификации</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                            {testResult.toolkit_info.auth_config_id}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.toolkit_info!.auth_config_id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-green-600 mt-1">✨ Автоматически создано!</p>
                      </div>

                      <div>
                        <Label className="text-sm font-medium">Идентификатор пользователя</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                            {testResult.toolkit_info.user_id}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.toolkit_info!.user_id)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Connection Request */}
                {testResult.connection_request && (
                  <Card className={testResult.mcp_urls ? "lg:col-span-2" : "lg:col-span-2"}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        Запрос на подключение
                        <Badge variant="outline">{testResult.connection_request.status}</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {testResult.connection_request.redirect_url && (
                        <div>
                          <Label className="text-sm font-medium">URL-адрес перенаправления</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1 break-all">
                              {testResult.connection_request.redirect_url}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(testResult.connection_request.redirect_url!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => window.open(testResult.connection_request.redirect_url, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {testResult.connection_request.connected_account_id && (
                        <div>
                          <Label className="text-sm font-medium">ID подключенного аккаунта</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                              {testResult.connection_request.connected_account_id}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(testResult.connection_request.connected_account_id!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {testResult.connection_request.connection_id && (
                        <div>
                          <Label className="text-sm font-medium">ID подключения</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-muted px-2 py-1 rounded text-sm flex-1">
                              {testResult.connection_request.connection_id}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(testResult.connection_request.connection_id!)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}

                {/* Auto-Generated MCP URLs */}
                {testResult.mcp_urls && (
                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Server className="h-4 w-4" />
                        🚀 Автоматически сгенерированные URL-адреса сервера MCP
                        <Badge variant="default" className="bg-green-600">
                          Готовы к использованию!
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Эти URL-адреса сервера MCP были автоматически сгенерированы после успешного подключения.
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* MCP Server Info */}
                      <div className="bg-muted/30 p-3 rounded-lg space-y-3">
                        <Label className="text-sm font-semibold">Информация о сервере MCP</Label>
                        
                        <div>
                          <Label className="text-xs font-medium text-muted-foreground">ID сервера</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <code className="bg-background px-2 py-1 rounded text-sm flex-1">
                              {testResult.mcp_urls.mcp_server_info.id}
                            </code>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => copyToClipboard(testResult.mcp_urls.mcp_server_info.id)}
                            >
                              <Copy className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {testResult.mcp_urls.mcp_server_info.name && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Имя сервера</Label>
                            <p className="text-sm mt-1">{testResult.mcp_urls.mcp_server_info.name}</p>
                          </div>
                        )}

                        {testResult.mcp_urls.mcp_server_info.allowed_tools.length > 0 && (
                          <div>
                            <Label className="text-xs font-medium text-muted-foreground">Разрешенные инструменты</Label>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {testResult.mcp_urls.mcp_server_info.allowed_tools.map((tool, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {tool}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Base MCP URL */}
                      <div>
                        <Label className="text-sm font-medium">Базовый URL-адрес сервера MCP</Label>
                        <div className="flex items-center gap-2 mt-1">
                          <code className="bg-muted px-2 py-1 rounded text-sm flex-1 break-all">
                            {testResult.mcp_urls.mcp_url}
                          </code>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(testResult.mcp_urls.mcp_url)}
                          >
                            <Copy className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.open(testResult.mcp_urls.mcp_url, '_blank')}
                          >
                            <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      {/* User-Specific URLs */}
                      {testResult.mcp_urls.user_ids_url.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">🎯 URL-адреса для конкретного пользователя (рекомендуется)</Label>
                          <p className="text-xs text-muted-foreground mb-2">
                            URL-адреса, настроенные для вашего ID пользователя с подключенной учетной записью - используйте их в своем клиенте MCP!
                          </p>
                          {testResult.mcp_urls.user_ids_url.map((url, index) => (
                            <div key={index} className="mb-2">
                              <Label className="text-xs font-medium text-muted-foreground">URL-адрес пользователя {index + 1}</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="bg-muted px-2 py-1 rounded text-sm flex-1 break-all">
                                  {url}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(url)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => window.open(url, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Connected Account URLs */}
                      {testResult.mcp_urls.connected_account_urls.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium">URL-адреса подключенных аккаунтов</Label>
                          <p className="text-xs text-muted-foreground mb-2">
                            Отдельные URL-адреса для каждого подключенного аккаунта
                          </p>
                          {testResult.mcp_urls.connected_account_urls.map((url, index) => (
                            <div key={index} className="mb-2">
                              <Label className="text-xs font-medium text-muted-foreground">URL-адрес аккаунта {index + 1}</Label>
                              <div className="flex items-center gap-2 mt-1">
                                <code className="bg-muted px-2 py-1 rounded text-sm flex-1 break-all">
                                  {url}
                                </code>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => copyToClipboard(url)}
                                >
                                  <Copy className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => window.open(url, '_blank')}
                                >
                                  <ExternalLink className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Message and Instructions */}
              <Alert variant={testResult.test_status === 'success' ? 'default' : 'destructive'}>
                {testResult.test_status === 'success' ? (
                  <CheckCircle className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  <div className="space-y-2">
                    <p>{testResult.message}</p>
                    {testResult.instructions && (
                      <p><strong>Следующие шаги:</strong> {testResult.instructions}</p>
                    )}
                    {testResult.error && (
                      <div className="mt-2 text-sm">
                        <strong>Ошибка:</strong> {testResult.error}
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
    </div>
  );
} 