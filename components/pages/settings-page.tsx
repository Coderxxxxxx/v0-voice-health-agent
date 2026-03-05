'use client'

import { useTheme } from '@/lib/theme-context'
import { useI18n } from '@/lib/i18n-context'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Moon, Sun, Globe, Bell, Lock, User } from 'lucide-react'

type Language = 'en' | 'ur-roman' | 'ur-rtl'

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme()
  const { language, setLanguage, t, isRTL } = useI18n()

  const languages: Array<{ value: Language; label: string }> = [
    { value: 'en', label: 'English' },
    { value: 'ur-roman', label: 'اردو (Roman)' },
    { value: 'ur-rtl', label: 'اردو' },
  ]

  return (
    <div className={`space-y-6 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sun className="size-5" />
            {t('theme')}
          </CardTitle>
          <CardDescription>
            {theme === 'light' ? t('lightMode') : t('darkMode')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {theme === 'light' ? (
                <Sun className="size-4 text-yellow-500" />
              ) : (
                <Moon className="size-4 text-slate-400" />
              )}
              <span className="font-medium">
                {theme === 'light' ? t('lightMode') : t('darkMode')}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'light' ? (
                <>
                  <Moon className="size-4" />
                  {t('darkMode')}
                </>
              ) : (
                <>
                  <Sun className="size-4" />
                  {t('lightMode')}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Language Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="size-5" />
            {t('language')}
          </CardTitle>
          <CardDescription>
            Choose your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((lang) => (
              <Button
                key={lang.value}
                variant={language === lang.value ? 'default' : 'outline'}
                onClick={() => setLanguage(lang.value)}
                className="justify-start"
              >
                {lang.label}
                {language === lang.value && (
                  <Badge variant="secondary" className="ml-auto size-2 rounded-full p-0" />
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5" />
            {t('notifications')}
          </CardTitle>
          <CardDescription>
            Manage your notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('enableNotifications')}</p>
              <p className="text-sm text-muted-foreground">
                Receive medication and health reminders
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{t('enableLocationAccess')}</p>
              <p className="text-sm text-muted-foreground">
                Help us locate nearby medical facilities
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Privacy Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="size-5" />
            {t('privacy')}
          </CardTitle>
          <CardDescription>
            Control your data and privacy
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-medium">{t('dataPrivacy')}</p>
                <p className="text-sm text-muted-foreground">
                  Your health data is encrypted and secure
                </p>
              </div>
              <Badge variant="outline" className="text-green-700 dark:text-green-400">
                Protected
              </Badge>
            </div>
            <Button variant="outline" size="sm">
              View Privacy Policy
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5" />
            {t('account')}
          </CardTitle>
          <CardDescription>
            Manage your account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium">Emergency Contact</p>
            <input
              type="tel"
              placeholder="+92 XXX XXXXXXX"
              className="w-full px-3 py-2 border border-border rounded-md text-sm bg-background"
              defaultValue="+92 300 1234567"
            />
          </div>
          <Button className="w-full sm:w-auto" variant="outline">
            {t('save')}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
