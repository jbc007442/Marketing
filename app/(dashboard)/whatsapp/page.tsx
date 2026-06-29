'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { Upload, Users, Send, MessageCircle, FileSpreadsheet, Trash2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label';

type Contact = {
  name: string;
  phone: string;
};

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [campaignName, setCampaignName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [singleName, setSingleName] = useState('');
  const [singlePhone, setSinglePhone] = useState('');

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target?.result;

      const workbook = XLSX.read(data, {
        type: 'binary',
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const json = XLSX.utils.sheet_to_json(sheet);

      const formatted = json.map((item: any) => ({
        name: item.name || item.Name || '',
        phone: item.phone || item.Phone || item.mobile || item.Mobile || '',
      }));

      setContacts(formatted);
      toast.success(`${formatted.length} contacts imported`);
    };

    reader.readAsBinaryString(file);
  };

  const sendCampaign = async () => {
    if (!message) {
      toast.error('Enter message');
      return;
    }

    if (!contacts.length) {
      toast.error('Upload contacts first');
      return;
    }

    setLoading(true);
    setProgress(0);

    let sent = 0;

    for (const contact of contacts) {
      try {
        const text = message.replace('{{name}}', contact.name);

        await fetch('/api/whatsapp/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: contact.phone,
            message: text,
          }),
        });

        sent++;

        setProgress(Math.round((sent / contacts.length) * 100));
      } catch (error) {
        console.log(error);
      }
    }

    setLoading(false);
    toast.success('Campaign sent');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold">WhatsApp Bulk Marketing</h1>

          <p className="text-muted-foreground">Send WhatsApp campaigns using Meta Cloud API.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Users className="h-10 w-10 text-green-600" />

              <div>
                <p className="text-muted-foreground text-sm">Contacts</p>

                <h2 className="text-2xl font-bold">{contacts.length}</h2>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <MessageCircle className="h-10 w-10 text-blue-600" />

              <div>
                <p className="text-muted-foreground text-sm">Campaign</p>

                <h2 className="text-2xl font-bold">{campaignName || '-'}</h2>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center gap-4 p-6">
              <Send className="h-10 w-10 text-purple-600" />

              <div>
                <p className="text-muted-foreground text-sm">Progress</p>

                <h2 className="text-2xl font-bold">{progress}%</h2>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Contacts */}
          <Card>
            <CardHeader>
              <CardTitle>Contacts</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Upload */}
              <div className="rounded-lg border-2 border-dashed p-6 text-center">
                <FileSpreadsheet className="mx-auto mb-4 h-12 w-12 text-green-600" />

                <p className="font-medium">Upload CSV / XLSX</p>

                <p className="text-sm text-muted-foreground mb-4">Columns: name | phone</p>

                <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFile} />
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="border-t" />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-white px-2 text-xs text-muted-foreground">
                  OR
                </span>
              </div>

              {/* Single Contact */}
              <div className="space-y-4">
                <h3 className="font-medium">Add Single Contact</h3>

                <Input
                  placeholder="Name"
                  value={singleName}
                  onChange={(e) => setSingleName(e.target.value)}
                />

                <Input
                  placeholder="Phone Number"
                  value={singlePhone}
                  onChange={(e) => setSinglePhone(e.target.value)}
                />

                <Button
                  className="w-full"
                  onClick={() => {
                    if (!singlePhone) {
                      toast.error('Enter phone number');
                      return;
                    }

                    setContacts((prev) => [
                      ...prev,
                      {
                        name: singleName,
                        phone: singlePhone,
                      },
                    ]);

                    setSingleName('');
                    setSinglePhone('');

                    toast.success('Contact added');
                  }}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Add Contact
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Campaign */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Create Campaign</CardTitle>
            </CardHeader>

            <CardContent className="space-y-5">
              <div>
                <Label>Campaign Name</Label>

                <Input
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  placeholder="Summer Sale"
                />
              </div>

              <div>
                <Label>Message</Label>

                <Textarea
                  rows={8}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Hello {{name}}

🎉 Get 30% OFF today.

Visit:
https://yourwebsite.com`}
                />
              </div>

              {loading && (
                <div className="space-y-2">
                  <Progress value={progress} />

                  <p className="text-sm text-muted-foreground">
                    Sending...
                    {progress}%
                  </p>
                </div>
              )}

              <Button
                onClick={sendCampaign}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Send className="mr-2 h-4 w-4" />

                {loading ? 'Sending...' : `Send to ${contacts.length} Contacts`}
              </Button>
            </CardContent>
          </Card>
        </div>

        {contacts.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Imported Contacts</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="max-h-96 overflow-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 text-left">Name</th>
                      <th className="py-3 text-left">Phone</th>
                      <th className="py-3 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3">{contact.name || '-'}</td>

                        <td className="py-3">{contact.phone}</td>

                        <td className="py-3 text-right">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setContacts((prev) => prev.filter((_, i) => i !== index));

                              toast.success('Contact removed');
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
