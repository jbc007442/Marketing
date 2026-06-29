'use client';

import { useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';
import { toast } from 'sonner';
import { useDropzone } from 'react-dropzone';
import { Upload, Plus, Send, Trash2, Users, Mail } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Contact = {
  name: string;
  email: string;
};

const templates = [
  {
    value: 'welcome',
    label: 'Welcome Email',
    preview: `Welcome {{name}} 👋

Thank you for joining our platform.
We're excited to have you onboard.`,
  },
  {
    value: 'offer',
    label: 'Special Offer',
    preview: `Hello {{name}}

Enjoy 30% OFF on all our services.
Limited time offer.`,
  },
  {
    value: 'travel',
    label: 'Travel Deals',
    preview: `Hello {{name}}

Discover amazing travel deals and exclusive discounts.`,
  },
];

export default function Page() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [template, setTemplate] = useState('welcome');
  const [open, setOpen] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [search, setSearch] = useState('');

  const selectedTemplate = templates.find((x) => x.value === template);

  const addContact = () => {
    if (!name || !email) {
      return toast.error('Please enter name and email');
    }

    const exists = contacts.find((x) => x.email.toLowerCase() === email.toLowerCase());

    if (exists) {
      return toast.error('Email already exists');
    }

    setContacts((prev) => [
      ...prev,
      {
        name,
        email,
      },
    ]);

    toast.success('Contact added');

    setName('');
    setEmail('');
    setOpen(false);
  };

  const removeContact = (email: string) => {
    setContacts((prev) => prev.filter((x) => x.email !== email));

    toast.success('Contact removed');
  };

  const importFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = evt.target?.result;

      const workbook = XLSX.read(data, {
        type: 'binary',
      });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      const rows: any[] = XLSX.utils.sheet_to_json(sheet);

      const users = rows
        .map((row) => ({
          name: row.Name || row.name || row.NAME || '',
          email: row.Email || row.email || row.EMAIL || '',
        }))
        .filter((x) => x.email);

      setContacts((prev) => {
        const merged = [...prev];

        users.forEach((user) => {
          const exists = merged.find((x) => x.email.toLowerCase() === user.email.toLowerCase());

          if (!exists) {
            merged.push(user);
          }
        });

        return merged;
      });

      toast.success(`${users.length} contacts imported`);
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/csv': ['.csv'],
    },
    onDrop: (files) => {
      if (!files.length) return;
      importFile(files[0]);
    },
  });

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (x) =>
        x.name.toLowerCase().includes(search.toLowerCase()) ||
        x.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [contacts, search]);

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
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Email Marketing</h1>

          <p className="text-muted-foreground">Create and send campaigns to your contacts.</p>
        </div>

        <Button size="lg" onClick={sendCampaign}>
          <Send className="mr-2 h-4 w-4" />
          Send Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Contacts</p>

              <h2 className="text-3xl font-bold">{contacts.length}</h2>
            </div>

            <Users className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center justify-between p-6">
            <div>
              <p className="text-sm text-muted-foreground">Selected Template</p>

              <h2 className="text-lg font-semibold">{selectedTemplate?.label}</h2>
            </div>

            <Mail className="h-10 w-10 text-muted-foreground" />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 md:flex-row">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />

              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

              <Button className="w-full" onClick={addContact}>
                Save Contact
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Import */}
      <Card>
        <CardHeader>
          <CardTitle>Import Contacts</CardTitle>
        </CardHeader>

        <CardContent>
          <div
            {...getRootProps()}
            className="cursor-pointer rounded-xl border-2 border-dashed p-10 text-center transition hover:bg-muted"
          >
            <input {...getInputProps()} />

            <Upload className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />

            <h3 className="font-semibold">Drag & Drop Excel or CSV</h3>

            <p className="text-sm text-muted-foreground">Click here to upload contacts</p>
          </div>
        </CardContent>
      </Card>

      {/* Template */}
      <Card>
        <CardHeader>
          <CardTitle>Email Template</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select value={template} onValueChange={setTemplate}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {templates.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="whitespace-pre-wrap rounded-lg border bg-muted p-4">
            {selectedTemplate?.preview}
          </div>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <CardTitle>
            Contacts
            <Badge className="ml-2">{contacts.length}</Badge>
          </CardTitle>

          <Input
            placeholder="Search contacts..."
            className="md:w-72"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredContacts.length ? (
                filteredContacts.map((contact, index) => (
                  <TableRow key={contact.email}>
                    <TableCell>{index + 1}</TableCell>

                    <TableCell>{contact.name}</TableCell>

                    <TableCell>{contact.email}</TableCell>

                    <TableCell className="text-right">
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => removeContact(contact.email)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                    No contacts found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

