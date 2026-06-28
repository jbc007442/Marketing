'use client';

import { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

type Contact = {
  name: string;
  email: string;
};

const templates = [
  {
    value: 'welcome',
    label: 'Welcome Email',
    preview: 'Welcome {{name}} 👋\nThank you for joining our platform.',
  },
  {
    value: 'offer',
    label: 'Special Offer',
    preview: 'Hello {{name}}\nEnjoy 30% OFF on our services.',
  },
  {
    value: 'travel',
    label: 'Travel Deals',
    preview: 'Hello {{name}}\nDiscover amazing travel deals.',
  },
];

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [template, setTemplate] = useState('welcome');

  const selectedTemplate = templates.find((t) => t.value === template);

  const addContact = () => {
    if (!name || !email) {
      return toast.error('Please enter name and email');
    }

    const exists = contacts.find((x) => x.email === email);

    if (exists) {
      return toast.error('Email already added');
    }

    setContacts((prev) => [
      ...prev,
      {
        name,
        email,
      },
    ]);

    setName('');
    setEmail('');
  };

  const removeContact = (email: string) => {
    setContacts((prev) => prev.filter((x) => x.email !== email));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target?.result;

      const workbook = XLSX.read(data, {
        type: 'binary',
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const users = rows.map((row) => ({
        name: row.Name || row.name || '',
        email: row.Email || row.email || '',
      }));

      setContacts((prev) => [...prev, ...users]);

      toast.success(`${users.length} contacts imported`);
    };

    reader.readAsBinaryString(file);
  };

  const sendCampaign = async () => {
    if (!contacts.length) {
      return toast.error('Add contacts first');
    }

    try {
      const { data } = await axios.post('/api/email/send', {
        contacts,
        template,
      });

      toast.success(data.message);

      setContacts([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send campaign');
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Email Marketing</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add Contact</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

            <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <Button onClick={addContact}>Add Contact</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import Contacts</CardTitle>
        </CardHeader>

        <CardContent>
          <Input type="file" accept=".csv,.xlsx,.xls" onChange={handleFileUpload} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Template</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <select
            className="w-full rounded-md border p-3"
            value={template}
            onChange={(e) => setTemplate(e.target.value)}
          >
            {templates.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          <div className="rounded-lg border bg-zinc-50 p-4 whitespace-pre-wrap">
            {selectedTemplate?.preview}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contacts ({contacts.length})</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.email} className="border-b">
                    <td className="p-3">{contact.name}</td>

                    <td className="p-3">{contact.email}</td>

                    <td className="p-3">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeContact(contact.email)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Button size="lg" onClick={sendCampaign}>
        Send Campaign
      </Button>
    </div>
  );
}
