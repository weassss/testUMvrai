"use client"

import * as React from "react"
import { ChevronRight, ChevronDown, File, Folder, Pencil, Plus, Trash, Search, GripVertical, X, Upload } from "lucide-react"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const initialData = {
  pages: [
    {
      name: "Home",
      sections: [
        {
          name: "Banner",
          elements: [
            { type: "video", content: "/videos/banner-video.mp4" }
          ]
        },
        {
          name: "Clients",
          elements: [
            { type: "client", name: "Client 1", logo: "/logos/client1.png" },
            { type: "client", name: "Client 2", logo: "/logos/client2.png" }
          ]
        },
        {
          name: "Why Choose Us",
          elements: [
            { type: "card", title: "Expertise", description: "Years of experience", image: "/images/expertise.jpg" },
            { type: "card", title: "Innovation", description: "Cutting-edge solutions", image: "/images/innovation.jpg" }
          ]
        }
      ]
    },
    {
      name: "Services",
      sections: [
        {
          name: "Why Choose Our Services",
          elements: [
            { type: "service-feature", title: "Quality", description: "Top-notch service", icon: "star" },
            { type: "service-feature", title: "Reliability", description: "Always on time", icon: "clock" }
          ]
        },
        {
          name: "Services List",
          elements: [
            {
              type: "service",
              title: "Consulting",
              description: "Expert advice",
              icon: "briefcase",
              steps: [
                { title: "Analysis", image: "/images/analysis.jpg", description: "In-depth analysis of your business" },
                { title: "Strategy", image: "/images/strategy.jpg", description: "Develop a tailored strategy" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "About",
      sections: [
        {
          name: "Who We Are",
          elements: [
            { type: "paragraph", content: "We are a leading consulting firm." },
            { type: "paragraph", content: "Our mission is to help businesses grow." },
            { type: "image", src: "/images/team-photo.jpg", alt: "Our Team" }
          ]
        },
        {
          name: "Timeline",
          elements: [
            { type: "timeline-event", date: "2000", title: "Founded", text: "Company established", image: "/images/founding.jpg" },
            { type: "timeline-event", date: "2010", title: "Expansion", text: "Opened international offices", image: "/images/expansion.jpg" }
          ]
        },
        {
          name: "Management Team",
          elements: [
            { type: "team-member", name: "John Doe", role: "CEO", photo: "/team/john-doe.jpg", email: "john@example.com" },
            { type: "team-member", name: "Jane Smith", role: "CTO", photo: "/team/jane-smith.jpg", email: "jane@example.com" }
          ]
        }
      ]
    },
    {
      name: "Help",
      sections: [
        {
          name: "FAQ",
          elements: [
            {
              type: "faq-category",
              title: "General",
              questions: [
                { question: "What services do you offer?", answer: "We offer a wide range of consulting services." },
                { question: "How can I contact support?", answer: "You can reach our support team at support@example.com" }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "Contact",
      sections: [
        {
          name: "Contact Info",
          elements: [
            { type: "contact-info", phone: "+1 234 567 8900", address: "123 Main St, City, Country", email: "contact@example.com" }
          ]
        }
      ]
    }
  ]
}

const TreeView = ({ data, onEdit, onAdd, onRemove, onReorder, searchTerm, expandedPaths, newElementPath }) => {
  const [expanded, setExpanded] = React.useState(expandedPaths)
  const newElementRef = React.useRef(null)

  React.useEffect(() => {
    setExpanded(expandedPaths)
  }, [expandedPaths])

  React.useEffect(() => {
    if (newElementRef.current) {
      newElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [newElementPath])

  const toggleExpand = (key) => {
    setExpanded(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const renderElement = (element, index, path) => {
    const fullPath = [...path, index].join('.')
    const isHighlighted = searchTerm && 
      (element.title || element.name || element.content || element.date || '').toLowerCase().includes(searchTerm.toLowerCase())
    const isNewElement = fullPath === newElementPath

    return (
      <Draggable key={fullPath} draggableId={fullPath} index={index}>
        {(provided) => (
          <div
            ref={(el) => {
              provided.innerRef(el)
              if (isNewElement) {
                newElementRef.current = el
              }
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`ml-8 flex items-center ${isHighlighted ? 'bg-yellow-100 font-bold' : ''} ${isNewElement ? 'animate-pulse bg-green-100' : ''}`}
          >
            <GripVertical className="h-4 w-4 text-gray-400 mr-2" />
            <File className="h-4 w-4 mr-2" />
            <span className="text-sm">{element.type === 'timeline-event' ? element.date : (element.title || element.name || 'Element')}</span>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 p-0 h-6 w-6"
              onClick={() => onEdit([...path, index], element)}
            >
              <Pencil className="h-4 w-4" />
              <span className="sr-only">Edit</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="ml-2 p-0 h-6 w-6"
              onClick={() => onRemove([...path, index])}
            >
              <Trash className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        )}
      </Draggable>
    )
  }

  const renderSection = (section, pageIndex, sectionIndex) => {
    const path = [pageIndex, 'sections', sectionIndex]
    const fullPath = path.join('.')
    const isExpanded = expanded[fullPath]
    const isHighlighted = searchTerm && section.name.toLowerCase().includes(searchTerm.toLowerCase())

    return (
      <div key={fullPath} className="ml-4">
        <div className={`flex items-center ${isHighlighted ? 'bg-yellow-100 font-bold' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6"
            onClick={() => toggleExpand(fullPath)}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
          </Button>
          <Folder className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium">{section.name}</span>
          <AddElementDialog onAdd={(newElement) => onAdd([...path, 'elements'], newElement)} sectionName={section.name} />
        </div>
        {isExpanded && (
          <Droppable droppableId={fullPath} type={`section-${fullPath}`}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {section.elements.map((element, index) => renderElement(element, index, [...path, 'elements']))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        )}
      </div>
    )
  }

  const renderPage = (page, index) => {
    const path = [index]
    const fullPath = path.join('.')
    const isExpanded = expanded[fullPath]
    const isHighlighted = searchTerm && page.name.toLowerCase().includes(searchTerm.toLowerCase())

    return (
      <div key={fullPath} className="mb-4">
        <div className={`flex items-center ${isHighlighted ? 'bg-yellow-100 font-bold' : ''}`}>
          <Button
            variant="ghost"
            size="sm"
            className="p-0 h-6 w-6"
            onClick={() => toggleExpand(fullPath)}
          >
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            <span className="sr-only">{isExpanded ? 'Collapse' : 'Expand'}</span>
          </Button>
          <Folder className="h-4 w-4 mr-2" />
          <span className="text-sm font-semibold">{page.name}</span>
        </div>
        {isExpanded && page.sections.map((section, sectionIndex) => renderSection(section, index, sectionIndex))}
      </div>
    )
  }

  return (
    <DragDropContext onDragEnd={(result) => onReorder(result)}>
      <div className="mt-4">
        {data.pages.map((page, index) => renderPage(page, index))}
      </div>
    </DragDropContext>
  )
}

const AddElementDialog = ({ onAdd, sectionName }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleAdd = (newElement) => {
    onAdd(newElement)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="ml-2 p-0 h-6 w-6"
        >
          <Plus className="h-4 w-4" />
          <span className="sr-only">Add Element</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Element to {sectionName}</DialogTitle>
        </DialogHeader>
        <AddElementForm onAdd={handleAdd} sectionName={sectionName} />
      </DialogContent>
    </Dialog>
  )
}

const AddElementForm = ({ onAdd, sectionName }) => {
  const [newElement, setNewElement] = React.useState(() => {
    switch (sectionName) {
      case "Banner":
        return { type: "video", content: "", file: null, contentType: "url" }
      case "Clients":
        return { type: "client", name: "", logo: "", file: null, logoType: "url" }
      case "Why Choose Us":
        return { type: "card", title: "", description: "", image: "", file: null, imageType: "url" }
      case "Why Choose Our Services":
        return { type: "service-feature", title: "", description: "", icon: "" }
      case "Services List":
        return { type: "service", title: "", description: "", icon: "", steps: [{ title: "", image: "", description: "", file: null, imageType: "url" }] }
      case "Who We Are":
        return { type: "paragraph", content: "" }
      case "Timeline":
        return { type: "timeline-event", date: "", title: "", text: "", image: "", file: null, imageType: "url" }
      case "Management Team":
        return { type: "team-member", name: "", role: "", photo: "", file: null, photoType: "url", email: "" }
      case "FAQ":
        return { type: "faq-category", title: "", questions: [{ question: "", answer: "" }] }
      case "Contact Info":
        return { type: "contact-info", phone: "", address: "", email: "" }
      default:
        return { type: "text", content: "" }
    }
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onAdd(newElement)
  }

  const handleChange = (field, value) => {
    setNewElement(prev => ({ ...prev, [field]: value }))
  }

  const handleFileChange = (field, file) => {
    setNewElement(prev => ({ ...prev, [field]: URL.createObjectURL(file), file: file }))
  }

  const renderFields = () => {
    switch (sectionName) {
      case "Banner":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content-type">Content Type</Label>
              <RadioGroup
                defaultValue="url"
                onValueChange={(value) => handleChange("contentType", value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">Upload</Label>
                </div>
              </RadioGroup>
            </div>
            {newElement.contentType === "url" ? (
              <div>
                <Label htmlFor="content">Video URL</Label>
                <Input
                  id="content"
                  value={newElement.content}
                  onChange={(e) => 
                    handleChange("content", e.target.value)
                  }
                  placeholder="Enter video URL"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="file">Upload Video</Label>
                <Input
                  id="file"
                  type="file"
                  accept="video/*"
                  onChange={(e) => handleFileChange("content", e.target.files[0])}
                />
              </div>
            )}
          </div>
        )
      case "Clients":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Client Name</Label>
              <Input
                id="name"
                value={newElement.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="logo-type">Logo Type</Label>
              <RadioGroup
                defaultValue="url"
                onValueChange={(value) => handleChange("logoType", value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">Upload</Label>
                </div>
              </RadioGroup>
            </div>
            {newElement.logoType === "url" ? (
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  value={newElement.logo}
                  onChange={(e) => handleChange("logo", e.target.value)}
                  placeholder="Enter logo URL"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="file">Upload Logo</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("logo", e.target.files[0])}
                />
              </div>
            )}
          </div>
        )
      case "Why Choose Us":
      case "Why Choose Our Services":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newElement.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newElement.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter description"
              />
            </div>
            {sectionName === "Why Choose Us" ? (
              <div>
                <Label htmlFor="image-type">Image Type</Label>
                <RadioGroup
                  defaultValue="url"
                  onValueChange={(value) => handleChange("imageType", value)}
                  className="flex space-x-4 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="url" id="url" />
                    <Label htmlFor="url">URL</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upload" id="upload" />
                    <Label htmlFor="upload">Upload</Label>
                  </div>
                </RadioGroup>
                {newElement.imageType === "url" ? (
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={newElement.image}
                      onChange={(e) => handleChange("image", e.target.value)}
                      placeholder="Enter image URL"
                    />
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="file">Upload Image</Label>
                    <Input
                      id="file"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange("image", e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Label htmlFor="icon">Icon</Label>
                <Input
                  id="icon"
                  value={newElement.icon}
                  onChange={(e) => handleChange("icon", e.target.value)}
                  placeholder="Enter icon name"
                />
              </div>
            )}
          </div>
        )
      case "Services List":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newElement.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter service title"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newElement.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter service description"
              />
            </div>
            <div>
              <Label htmlFor="icon">Icon</Label>
              <Input
                id="icon"
                value={newElement.icon}
                onChange={(e) => handleChange("icon", e.target.value)}
                placeholder="Enter icon name"
              />
            </div>
            <div>
              <Label>Steps</Label>
              {newElement.steps.map((step, index) => (
                <div key={index} className="space-y-2 mt-2">
                  <Input
                    value={step.title}
                    onChange={(e) => {
                      const newSteps = [...newElement.steps]
                      newSteps[index] = { ...newSteps[index], title: e.target.value }
                      handleChange("steps", newSteps)
                    }}
                    placeholder="Step title"
                  />
                  <div>
                    <Label htmlFor={`step-image-type-${index}`}>Image Type</Label>
                    <RadioGroup
                      defaultValue="url"
                      onValueChange={(value) => {
                        const newSteps = [...newElement.steps]
                        newSteps[index] = { ...newSteps[index], imageType: value }
                        handleChange("steps", newSteps)
                      }}
                      className="flex space-x-4 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="url" id={`step-url-${index}`} />
                        <Label htmlFor={`step-url-${index}`}>URL</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="upload" id={`step-upload-${index}`} />
                        <Label htmlFor={`step-upload-${index}`}>Upload</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  {step.imageType === "url" ? (
                    <Input
                      value={step.image}
                      onChange={(e) => {
                        const newSteps = [...newElement.steps]
                        newSteps[index] = { ...newSteps[index], image: e.target.value }
                        handleChange("steps", newSteps)
                      }}
                      placeholder="Step image URL"
                    />
                  ) : (
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const newSteps = [...newElement.steps]
                        newSteps[index] = { 
                          ...newSteps[index], 
                          image: URL.createObjectURL(e.target.files[0]),
                          file: e.target.files[0]
                        }
                        handleChange("steps", newSteps)
                      }}
                    />
                  )}
                  <Textarea
                    value={step.description}
                    onChange={(e) => {
                      const newSteps = [...newElement.steps]
                      newSteps[index] = { ...newSteps[index], description: e.target.value }
                      handleChange("steps", newSteps)
                    }}
                    placeholder="Step description"
                  />
                  <Button type="button" onClick={() => {
                    const newSteps = newElement.steps.filter((_, i) => i !== index)
                    handleChange("steps", newSteps)
                  }} variant="destructive">Remove Step</Button>
                </div>
              ))}
              <Button type="button" onClick={() => {
                const newSteps = [...newElement.steps, { title: "", image: "", description: "", imageType: "url" }]
                handleChange("steps", newSteps)
              }} className="mt-2">Add Step</Button>
            </div>
          </div>
        )
      case "Who We Are":
        return (
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newElement.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Enter content"
            />
          </div>
        )
      case "Timeline":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={newElement.date}
                onChange={(e) => handleChange("date", e.target.value)}
                placeholder="Enter date"
              />
            </div>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newElement.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={newElement.text}
                onChange={(e) => handleChange("text", e.target.value)}
                placeholder="Enter text"
              />
            </div>
            <div>
              <Label htmlFor="image-type">Image Type</Label>
              <RadioGroup
                defaultValue="url"
                onValueChange={(value) => handleChange("imageType", value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">Upload</Label>
                </div>
              </RadioGroup>
            </div>
            {newElement.imageType === "url" ? (
              <div>
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={newElement.image}
                  onChange={(e) => handleChange("image", e.target.value)}
                  placeholder="Enter image URL"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="file">Upload Image</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("image", e.target.files[0])}
                />
              </div>
            )}
          </div>
        )
      case "Management Team":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newElement.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newElement.role}
                onChange={(e) => handleChange("role", e.target.value)}
                placeholder="Enter role"
              />
            </div>
            <div>
              <Label htmlFor="photo-type">Photo Type</Label>
              <RadioGroup
                defaultValue="url"
                onValueChange={(value) => handleChange("photoType", value)}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="url" id="url" />
                  <Label htmlFor="url">URL</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="upload" id="upload" />
                  <Label htmlFor="upload">Upload</Label>
                </div>
              </RadioGroup>
            </div>
            {newElement.photoType === "url" ? (
              <div>
                <Label htmlFor="photo">Photo URL</Label>
                <Input
                  id="photo"
                  value={newElement.photo}
                  onChange={(e) => handleChange("photo", e.target.value)}
                  placeholder="Enter photo URL"
                />
              </div>
            ) : (
              <div>
                <Label htmlFor="file">Upload Photo</Label>
                <Input
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("photo", e.target.files[0])}
                />
              </div>
            )}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={newElement.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
        )
      case "FAQ":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Category Title</Label>
              <Input
                id="title"
                value={newElement.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter category title"
              />
            </div>
            <div>
              <Label>Questions</Label>
              {newElement.questions.map((q, index) => (
                <div key={index} className="space-y-2 mt-2">
                  <Input
                    value={q.question}
                    onChange={(e) => {
                      const newQuestions = [...newElement.questions]
                      newQuestions[index] = { ...newQuestions[index], question: e.target.value }
                      handleChange("questions", newQuestions)
                    }}
                    placeholder="Question"
                  />
                  <Textarea
                    value={q.answer}
                    onChange={(e) => {
                      const newQuestions = [...newElement.questions]
                      newQuestions[index] = { ...newQuestions[index], answer: e.target.value }
                      handleChange("questions", newQuestions)
                    }}
                    placeholder="Answer"
                  />
                  <Button type="button" onClick={() => {
                    const newQuestions = newElement.questions.filter((_, i) => i !== index)
                    handleChange("questions", newQuestions)
                  }} variant="destructive">Remove Question</Button>
                </div>
              ))}
              <Button type="button" onClick={() => {
                const newQuestions = [...newElement.questions, { question: "", answer: "" }]
                handleChange("questions", newQuestions)
              }} className="mt-2">Add Question</Button>
            </div>
          </div>
        )
      case "Contact Info":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={newElement.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={newElement.address}
                onChange={(e) => handleChange("address", e.target.value)}
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={newElement.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
        )
      default:
        return (
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newElement.content}
              onChange={(e) => handleChange("content", e.target.value)}
              placeholder="Enter content"
            />
          </div>
        )
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {renderFields()}
      <Button type="submit">Add Element</Button>
    </form>
  )
}

const ServiceSteps = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-4 p-4 bg-gray-100 rounded-lg">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-sm text-gray-600">{step.description}</p>
            {step.image && <img src={step.image} alt={step.title} className="mt-2 rounded-md" />}
          </div>
        </div>
      ))}
    </div>
  )
}

const FAQSection = ({ questions }) => {
  return (
    <div className="space-y-4">
      {questions.map((item, index) => (
        <details key={index} className="bg-white shadow-md rounded-lg">
          <summary className="px-4 py-2 font-semibold cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            {item.question}
          </summary>
          <p className="px-4 py-2 text-gray-600">{item.answer}</p>
        </details>
      ))}
    </div>
  )
}

export default function SiteManagement() {
  const [data, setData] = React.useState(initialData)
  const [editingPath, setEditingPath] = React.useState(null)
  const [editingValue, setEditingValue] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [expandedPaths, setExpandedPaths] = React.useState({})
  const [newElementPath, setNewElementPath] = React.useState(null)

  React.useEffect(() => {
    if (newElementPath) {
      const timer = setTimeout(() => {
        setNewElementPath(null)
      }, 5000) // Le nouvel élément restera en surbrillance pendant 5 secondes
      return () => clearTimeout(timer)
    }
  }, [newElementPath])

  const handleEdit = (path, value) => {
    setEditingPath(path)
    setEditingValue(value)
  }

  const handleSave = () => {
    if (editingPath) {
      setData(prevData => {
        const newData = JSON.parse(JSON.stringify(prevData))
        let current = newData.pages
        for (let i = 0; i < editingPath.length - 1; i++) {
          current = current[editingPath[i]]
        }
        current[editingPath[editingPath.length - 1]] = editingValue
        return newData
      })
      setEditingPath(null)
      setEditingValue(null)
    }
  }

  const handleAdd = (path, newElement) => {
    setData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData))
      let current = newData.pages
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      current.push(newElement)
      const newElementIndex = current.length - 1
      const fullPath = [...path.slice(0, -1), newElementIndex].join('.')
      setNewElementPath(fullPath)
      setExpandedPaths(prev => ({
        ...prev,
        [path.slice(0, -1).join('.')]: true
      }))
      return newData
    })
  }

  const handleRemove = (path) => {
    setData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData))
      let current = newData.pages
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]]
      }
      current.splice(path[path.length - 1], 1)
      return newData
    })
  }

  const handleReorder = (result) => {
    if (!result.destination) {
      return
    }

    const sourcePath = result.source.droppableId.split('.')
    const destinationPath = result.destination.droppableId.split('.')
    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    setData(prevData => {
      const newData = JSON.parse(JSON.stringify(prevData))
      let sourceParent = newData.pages
      let destinationParent = newData.pages

      for (let i = 1; i < sourcePath.length; i++) {
        sourceParent = sourceParent[sourcePath[i]]
      }
      for (let i = 1; i < destinationPath.length; i++) {
        destinationParent = destinationParent[destinationPath[i]]
      }

      const [removed] = sourceParent.splice(sourceIndex, 1)
      destinationParent.splice(destinationIndex, 0, removed)

      return newData
    })
  }

  const expandPathsToSearchResults = (pages, term, path = []) => {
    let paths = {}
    pages.forEach((page, pageIndex) => {
      const pagePath = [...path, pageIndex]
      if (page.name.toLowerCase().includes(term.toLowerCase())) {
        paths[pagePath.join('.')] = true
      }
      page.sections.forEach((section, sectionIndex) => {
        const sectionPath = [...pagePath, 'sections', sectionIndex]
        if (section.name.toLowerCase().includes(term.toLowerCase())) {
          paths[sectionPath.join('.')] = true
          paths[pagePath.join('.')] = true
        }
        section.elements.forEach((element, elementIndex) => {
          const elementPath = [...sectionPath, 'elements', elementIndex]
          if ((element.title || element.name || element.content || '').toLowerCase().includes(term.toLowerCase())) {
            paths[elementPath.join('.')] = true
            paths[sectionPath.join('.')] = true
            paths[pagePath.join('.')] = true
          }
        })
      })
    })
    return paths
  }

  React.useEffect(() => {
    if (searchTerm) {
      const newExpandedPaths = expandPathsToSearchResults(data.pages, searchTerm)
      setExpandedPaths(newExpandedPaths)
    } else {
      setExpandedPaths({})
    }
  }, [searchTerm, data])

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden">
      <div className="w-full md:w-1/3 border-r p-4 flex flex-col">
        <div className="mb-4 mt-20">
          <Label htmlFor="search" className="sr-only">
            Search
          </Label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search in structure..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-grow">
          <h2 className="text-lg font-semibold mb-4">Site Structure</h2>
          <TreeView 
            data={data} 
            onEdit={handleEdit}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onReorder={handleReorder}
            searchTerm={searchTerm}
            expandedPaths={expandedPaths}
            newElementPath={newElementPath}
          />
        </ScrollArea>
      </div>
      <main className="flex-1 p-6 overflow-y-auto">
        {editingValue ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit Element</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(editingValue).map(([key, value]) => (
                  key !== 'type' && (
                    <div key={key}>
                      <Label htmlFor={key}>{key}</Label>
                      {key === 'steps' ? (
                        <ServiceSteps steps={value} />
                      ) : key === 'questions' ? (
                        <FAQSection questions={value} />
                      ) : typeof value === 'string' ? (
                        <Input
                          id={key}
                          value={value}
                          onChange={(e) => setEditingValue(prev => ({ ...prev, [key]: e.target.value }))}
                        />
                      ) : (
                        <Textarea
                          id={key}
                          value={JSON.stringify(value, null, 2)}
                          onChange={(e) => setEditingValue(prev => ({ ...prev, [key]: JSON.parse(e.target.value) }))}
                          rows={5}
                        />
                      )}
                    </div>
                  )
                ))}
              </div>
            </CardContent>
            <CardContent>
              <Button onClick={handleSave}>Save</Button>
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-gray-500 mt-10">Select an element to edit</p>
        )}
      </main>
    </div>
  )
}